import sun from "./assets/sun-svgrepo-com.svg"
import cold from "./assets/snowflake-forecast-svgrepo-com.svg"
import rain from "./assets/rain-svgrepo-com.svg"
import cloudy from "./assets/cloudy-forecast-svgrepo-com.svg"
import thunder from "./assets/rain-forecast-svgrepo-com.svg"
import React,{useState,useEffect} from "react"
import { Result } from "postcss"
import axios from "axios"

//Weather app

const api = {
  key : "0b606e3bcdd757062335667339f18f6c",
  base : "https://api.openweathermap.org/data/2.5/",
  key2 : "035025594ac4d0cd37237fff2cbb3a95"
};

const api2 = {
  key: "035025594ac4d0cd37237fff2cbb3a95",
  base : "api.openweathermap.org/data/2.5/forecast?zip={city ID}&appid={API key}"
}
const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=0b606e3bcdd757062335667339f18f6c&units=metric"
const days = ["SUNDAY","MONDAY","TUESADAY","WEDNESDAY","THRUSDAY","FRIDAY","SATURDAY"]
const image = {
  rain : rain,
  mist : cold,
  clouds : cloudy,
  clear : sun,
  thunderstorm : thunder
}



var temp = ""
function App(){
  const [city,setCity] = useState('')
  const [weather,setWeather] = useState({
    weat : "Sunny",
    temp : 10,
    wind : 100,
    humid : 10,
    vis : 1,
    pressure : 10
  })
  const [forcast,setForcast] = useState({
    day : ["SUNDAY","MONDAY","TUESADAY","WEDNESDAY","THRUSDAY"],
    tempCel : [22,22,22,22,22],
    tempFar : [71.6,71.6,71.6,71.6,71.6],
    weat : ["rain", "mist", "clouds", "clear","thunderstorm"]
  })
  const[pincode,setpincode] = useState('delhi')
  var par = 0
  useEffect(() => {
    const featchWeather = async() =>{0
      const res = await fetch(`${api.base}weather?q=${pincode}&appid=${api.key}&units=metric`);
      const result = await res.json().then(
        result =>{
          const temp = {
            weat : result.weather[0]?.main,
            temp : result.main.temp,
            wind : result.wind.speed,
            humid : result.main.humidity,
            vis : result.visibility,
            pressure : result.main.pressure
          }
          setWeather(temp);
        }
      );
    }

    featchWeather();

    const featchForcast = async() =>{
      const res = await fetch(`${api.base}forecast?q=${pincode},us&appid=${api.key2}&units=metric`);
      const result = await res.json().then(
        result =>{
          const day = []
          const tempCel = []
          const tempFar = []
          const weat = []
          for(let i=0;i<40;i=i+8){
            day.push(days[new Date(result.list[i].dt_txt).getDay()])
            tempCel.push(result.list[i].main.temp)
            tempFar.push(Math.round((result.list[i].main.temp * 1.8 + 32)*100)/100);
            weat.push(result.list[i].weather[0].main)
          } 
          setForcast({day,tempCel,tempFar,weat});
          // window.location.reload()
          setpincode("")
          console.log(result);
        }
      );
      
    }
    featchForcast();
  },[city])

  return (
    <div className="w-full sm:min-h-screen bg-gradient-to-br from-[#0093E9] to-[#96E9C6] text-white">
      <div className="text-5xl w-full text-center py-7 font-semibold sm:flex justify-between sm:px-40">
        <div></div>
        <div>Weather App</div>
        <div className=" mt-3 sm:w-[20%] text-xl">
          <input 
            type="text" 
            placeholder="City Name" 
            name = "search"
            className=" w-[70%] py-2 sm:w-full h-full rounded-xl border-none bg-white/20 text-center placeholder:text-white outline-none focus:outline-slate-300"
            value = {pincode}
            onChange = {e=>
              setpincode(e.target.value)
            }
            onKeyDown={(e)=>{
              // e.preventDefault();
              if(e.key==="Enter"){ 
                par++
                // console.log(par)
                setCity(pincode);
              }
            }}
            />
            {console.log(pincode)}
          </div>
      </div>
      <div className=" w-full sm:w-[80%] sm:h-[500px] sm:flex-row sm:flex p-2 mx-auto gap-4 px-4 sm:px-2">

        <div className="flex flex-col gap-4 sm:w-[30%]">
          {/* Local Weather Report */}
          <div className="sm:h-[50%] w-full  rounded-lg bg-white/20 ">
            <h1 className="text-center pt-4 font-semibold text-2xl divide-x-10 overflow-hidden max-h-[20%]">LOCAL WEATHER REPORT</h1>
            <hr className=" align-text-bottom mx-7 border-5"></hr>
            <div className="flex w-full h-full p-5">
              {/* Image */}
              <div className=" w-[60%] h-[70%] ">
                <img src={sun} alt="" className="h-full w-full pt-3"/>
              </div>

              <div className=" space-y-5">
                {/* Day */}
                <div className=" text-2xl w-full text-center p">
                  <span className="font-bold mx-auto">SUNDAY</span>
                  <br /> 
                  <span className="text-lg font-semibold">{weather.weat}</span>
                </div>

                {/* TEMP */}
                <div className="text-center text-xl font-bold">
                  {weather.temp} &#8451; 
                  <br/>
                  71.6 &#8457;
                </div>
              </div>
            </div>
          </div>

          {/* Sea Forcast */}
          <div className="h-[50%] w-full  rounded-lg bg-white/20 ">
            <h1 className="text-center pt-4 font-semibold text-2xl divide-x-10 max-h-[20%] overflow-hidden">DETAIL FORCAST REPORT</h1>
            <hr className=" align-text-bottom mx-7 border-5"></hr>
            <div className="pl-7 py-3 text-[17px]">
              <ul>
                <li className=" w-full justify-between flex pr-5"><span>WIND SPEED</span><span>{weather.wind}</span></li>
                <li className=" w-full justify-between flex pr-5"><span>HUMIDITY</span><span>{weather.humid}</span></li>
                <li className=" w-full justify-between flex pr-5"><span>VISIBILITY</span><span>{weather.vis}</span></li>
                <li className=" w-full justify-between flex pr-5"><span>PRESSURE</span><span>{weather.pressure}</span></li>
                <li className=" w-full justify-between flex pr-5"><span>HUMIDITY</span><span>{weather.humid}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Days DIV */}
        <div className="mt-3 sm:mt-0 sm:w-[70%] p-3 justify-center h-full rounded-lg bg-white/20 flex flex-col  sm:flex-row sm:justify-evenly text-xl font-semibold sm:divide-x-2">
          {forcast.day.map((day,i)=>{
            return(
              <div className="flex sm:flex-col justify-between items-center sm:w-[20%] p-2 text-center sm:pt-5">
                <span className=" max-lg:text-sm">{day}</span>
                <img src={image[forcast.weat[i].toLowerCase()]} className=" h-20 sm:w-20 sm:h-25  " />  
                <span className="sm:pb-5">{forcast.tempCel[i]} &#8451; 
                <br/>
                {forcast.tempFar[i]} &#8457;</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
