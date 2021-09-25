import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
 
  const[location, setLocation] = useState('Angul');
  const[weather, setWeather] = useState([]);
  const[name, setName] = useState([]);
  const[country, setCountry] = useState([]);

   
  const weatherApi = async () => {
      let value = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=26bad1de49aba2243da7c50c64fb3dce`)
      .then((res) => {
        let mainValue = res.data; 
       
        setWeather(mainValue.main);
        setName(mainValue.name);
        setCountry(mainValue.sys);
      })
      .catch((err) => {
        console.log('Err', err)
      })
  }

   const changeLocation = (e) => {
        setLocation(e.target.value);
      }

  useEffect(() => {
       weatherApi();
      
  }, [location, name]);

  return (
    <div className="App">
      <header className='main-hdr'>
      <h2 className='hdr1'>GhostWeatherApp</h2>

      <div className='main-input'> 
         <input type='text' placeholder='Search...' id='input1' value={location} onChange={changeLocation}/>
      </div>
      </header>
    { weather ? (<div className='weather-area'>
            <p className='city'>{name}, {country.country}</p>
            
            <div className='temps'>
            <p>Current Temp:- {weather.temp} °C</p>
            <p>Lowest Temp:- {weather.temp_min} °C</p>
            <p>Highest Temp:- {weather.temp_max} °C</p>
            <p>Humidity:- {weather.humidity} </p>
            <p>Pressure:- {weather.pressure} Pa</p>
            </div>
      </div>): "No search"}
     
         
    </div>
  );
}

export default App;
