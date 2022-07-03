import React, { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({})
  const [battemp, setBtTemp] = useState({})
  const [location, setLocation] = useState('')
  const [bt, setBt] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a77676f55a9a9e7d1e08a9f21343d459`
  const a = 23;
  const searchLocation = (event) => {
    setBtTemp(null)
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        setBtTemp(null)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  const putTemp = (event) => {
    if (event.key === 'Enter') {
      setBtTemp(event.target.value)
      setBt('')
    }
  }
  const calculateAmbient = (bt, tp) => {
    if (bt !== null && tp !== undefined) {
      bt = parseInt(bt);
      tp = parseInt(tp);
      return parseInt((bt + tp) / 2);
    }
    return null;

  }
  return (
    <div className="app">
      <div className="logo"><img src="../logo1.png" height="80" /></div>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="search2">
          <input
            id="b_temp"
            onChange={event => setBt(event.target.value)}
            value={bt}
            onKeyPress={putTemp}
            placeholder='Enter Battery Temperature'
            type="text" />
        </div>
        <div className="top">
          <div className="location">
            <p><b>{data.name}</b></p>

          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p><b>{data.weather[0].main}</b></p> : null}
          </div>
        </div>
        {data.name != undefined &&
          <div className="bottom">
            <p className="bttemp">
              {battemp != null ?
                <p className="bold">{battemp}°C<br /><p className="bttext">Battery Temperature</p></p>
                : null
              }
            </p>

            {calculateAmbient(battemp, data.main.temp) != null ?
              <div className="ambient">
                <p>Ambient Room Temperature :</p>  <p className="bold">{calculateAmbient(battemp, data.main.temp)}°C</p>
              </div>
               : null
            }

            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} KMPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
