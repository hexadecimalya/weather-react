import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";


export default function Weather(props) {
  let apiKey = "c92aa008c831e4682122a5ffc70b2cbf";
  let [city, setCity] = useState(props.defaultCity);
  
  
  const [parameters, setParameters] = useState({ready: false});
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  // let apiUrlImage
  // let apiUrlCoords

  // let setImageByCondition = (condition) => {
  //   let imageCode = condition.weather[0].icon;
  //   let imageUrl = `http://openweathermap.org/img/wn/${imageCode}@2x.png`;
  //   // return `<img src="${imageUrl}" alt="" />`;
  //   return `hello`;
  // }

  function getStatsByCity(response) {
    console.log(response);
    let par = response.data;
    if (par.main) {
      setParameters(
       {
        ready: true,
        coordinates: par.coord,
        temperature: par.main.temp,
        humidity: par.main.humidity,
        date: new Date(par.dt * 1000),
        description: par.weather[0].description,
        icon: par.weather[0].icon,
        wind: par.wind.speed,
        city: par.name,
       }
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  function cityNotFound(error) {
    if (error.response.status === 404) {
      alert(`City ${city} not found, try again`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city) {
      axios.get(apiUrlCity).then(getStatsByCity).catch(cityNotFound);
    } else {
      alert(`Please, enter a city.`);
    }
  }

  function updCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Weather">
      <div className="container main-widget shadow p-3 mb-2 rounded">
        <div className="wrapper">
          <button className="current-location">📍Set current location</button>
        </div>
        <div className="Search">
          <form onSubmit={handleSubmit} id="search-form">
            <input
              className="form-control"
              id="city-input"
              autoComplete="off"
              onChange={updCity}
              type="text"
              placeholder="Type any city..."
            />
          </form>
        </div>
        <div className="weather-active-tab">
          <div className="row mb-2">
            <div className="h1 col-6 mt-3 text-wrap current-city">{city}</div>
            <div className="h4 mt-4 col-6 text-end datetime">
              <FormattedDate />
            </div>
          </div>
          <div className="row">
<WeatherParameters />
          
        </div>
        </div>
        <hr />
        <div className="forecast-block"></div>
      </div>
      <div className="footer">
        <a href="https://github.com/hexadecimalya/weather-react">
          Open-source code
        </a>{" "}
        by Alina Pantina
      </div>
    </div>
  );
}
