import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WbCloudy, WbSunny } from '@material-ui/icons';



function App() {

  const apiKey = 'bf6eb9b5bdd3c3e5f8c43c97205ae277';
 
  const[location, setLocation] = useState('Angul');
  const[weather, setWeather] = useState([]);
  const[name, setName] = useState([]);
  const[country, setCountry] = useState([]);
  const[typeWeather, setTypeWeather] = useState([]);
  

   const changeLocation = (e) => {
      let newEvent = e.target.value;
        setLocation(newEvent);
      }

  useEffect(() => {
    const weatherApi = async () => {
       await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
      .then((res) => res.data)
      .then((res) => {
        let mainValue = res; 
       
        setWeather(mainValue.main);
        setName(mainValue.name);
        setCountry(mainValue.sys);
        setTypeWeather(mainValue.weather['0']);
      })
      .catch((err) => {
        console.log(err)
      })
  }
       weatherApi();
      
  }, [location]);

  return (
    <div className="App">
      <header className='main-hdr'>
      <h2 className='hdr1'>GhostWeatherApp</h2>

      <div className='main-input'> 
      <form>
         <input type='text' placeholder='Search...' id='input1' value={location} onChange={changeLocation} />
      </form>
      </div>
      </header>


    { !weather ? "No search"
    :
    (<div className='weather-area'>
            <p className='city'>{name}, {country.country}</p>
            <div className='type-weather'>
            {typeWeather.main === 'Clear' ?( 
            <span>{typeWeather.main} <WbSunny className='wt'/></span>
            
            )
            :
            typeWeather.main === 'Clouds' ? 
            (   <span>{typeWeather.main} <WbCloudy className='wt'/></span>)
            :
            <span>{typeWeather.main}</span>
            }
         
            </div>
            <div className='temps'>
            <p>Current Temp:- {weather.temp} °C</p>
            <p>Lowest Temp:- {weather.temp_min} °C</p>
            <p>Highest Temp:- {weather.temp_max} °C</p>
            <p>Humidity:- {weather.humidity} </p>
            <p>Pressure:- {weather.pressure} Pa</p>
            </div>
      </div>)}
     
         
    </div>
  );
}

export default App;
