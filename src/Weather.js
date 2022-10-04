import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let apiKey = "c92aa008c831e4682122a5ffc70b2cbf";
  let [city, setCity] = useState("");
  const [parameters, setParameters] = useState("");
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  // let apiUrlImage
  // let apiUrlCoords
  function getStatsByCity(response) {
    console.log(response);
    let par = response.data;
    if (par.main) {
      setParameters(
        <div className="Parameters">
          <div className="col-4 col-sm-3 daily-temp">
            <span>{Math.round(par.main.temp)}</span>
            <a className="celsius-link" href="/">
              {" "}
              °C
            </a>
            <p className="weather-description">Sunny</p>
          </div>
          <div className="col-3 col-sm-5 text-center col-sm-4"></div>
          <div className="col-5 col-sm-4 pt-0 mb-2">
            <ul className="forecast-parameters text-end">
              <li>
                humidity: <span id="humidity">{par.main.humidity}</span>%
              </li>
              <li>
                pressure: <span id="pressure">{par.main.humidity}</span> hPa
              </li>
              <li>
                wind speed: <span id="wind">{Math.round(par.wind.speed)}</span>{" "}
                m/s
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city) {
      axios.get(apiUrlCity).then(getStatsByCity);
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
              autocomplete="off"
              onChange={updCity}
              type="text"
              placeholder="Type any city..."
            />
          </form>
        </div>
        <div className="weather-active-tab">
          <div className="row mb-2">
            <div className="h1 col-6 mt-3 text-wrap current-city">
              Las Palmas
            </div>
            <div className="h4 mt-4 col-6 text-end datetime">
              Tuesday 18, 19:08
            </div>
          </div>
          <div className="row">{parameters}</div>
        </div>
        <hr />
        <div className="forecast-block"></div>
      </div>
      <div className="footer">
        <a href="https://github.com/hexadecimalya/my-weather-widget">
          Open-source code
        </a>{" "}
        by Alina Pantina
      </div>
    </div>
  );
}
