import { useEffect, useRef, useState } from "react";
import "./weather.css";
import search_icon from "../assets/icons8-search-20.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {

  const inputref=useRef();
  const allIcons = {
    "01d": clear_icon,

    "01n": clear_icon,

    "02d": cloud_icon,

    "02n": cloud_icon,

    "03d": cloud_icon,

    "03n": cloud_icon,

    "04d": drizzle_icon,

    "04n": drizzle_icon,

    "09d": rain_icon,

    "09n": rain_icon,

    "10d": rain_icon,

    "10n": rain_icon,

    "13d": snow_icon,

    "13n": snow_icon,
  };
  const [weatherData, setWeatherdata] = useState(false);
  const search = async (city) => {
    if(city===""){
     alert("enter city name");
     return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3cf3522960e850a462b72cad50b8154f`;
      const respond = await fetch(url);
      const data = await respond.json();
      if(!respond.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherdata({
        Humidity: data.main.humidity,
        Speed: data.wind.speed,
        Temperature: Math.floor(data.main.temp),
        Location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherdata(false);
      console.error(error+'error while fetching data')
    }
  };

  useEffect(() => {
    search("delhi");
  }, []);

  return (
    <div className="weather">
      <div className="searchbar">
        <input ref={inputref} type="text" placeholder="Enter Your City Name" />
        <img src={search_icon} className="imageSearchicon"  onClick={()=>search(inputref.current.value)}/>
      </div>

      <img src={weatherData.icon} alt="humidity" className="weather-icon" />
      <p className="Temp">{weatherData.Temperature}</p>
      <p className="cityName">{weatherData.Location}</p>
      <div className="weatherData">
        <div className="column1">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{weatherData.Humidity}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="column1">
          <img src={wind_icon} alt="humidity" />
          <div>
            <p>{weatherData.Speed}</p>
            <span>WindSpeed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
