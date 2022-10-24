import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import WeatherParameters from "./WeatherParameters";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props) {
  //let apiKey = "dc18df010a99b3f0fe5d81a06ea6f2c6";

  const [parameters, setParameters] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  const apiKey = "c92aa008c831e4682122a5ffc70b2cbf";

  const celsiusToFar = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  function getStatsByCity(response) {
    let par = response.data;
    setParameters({
      ready: true,
      coordinates: par.coord,
      temperature: Math.round(par.main.temp),
      temperature_f: Math.round(celsiusToFar(par.main.temp)),
      pressure: par.main.pressure,
      humidity: par.main.humidity,
      date: new Date(par.dt * 1000),
      description: par.weather[0].description,
      iconUrl: `http://openweathermap.org/img/wn/${par.weather[0].icon}@2x.png`,
      wind: par.wind.speed,
      city: par.name,
    });
    setCity("");
  }

  function handleSuccessPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrlCoords).then(getStatsByCity);
  }

  function positionFailed() {
    console.log("Failed to get position");
  }

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      handleSuccessPosition,
      positionFailed
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function updCity(event) {
    setCity(event.target.value);
  }

  function searchCity() {
    let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrlCity).then(getStatsByCity).catch(cityNotFound);
  }

  function cityNotFound(error) {
    if (error.response.status === 404) {
      alert(`City ${city} not found, try again`);
    }
  }

  if (!parameters.ready) {
    searchCity();
    return <div>Loading...</div>;
  } else {
    return (
      <div className="Weather">
        <div className="container main-widget shadow p-3 mb-2 rounded">
          <div className="wrapper">
            <button className="current-location" onClick={getPosition}>
              📍Set current location
            </button>
          </div>
          <div className="Search">
            <form onSubmit={handleSubmit} id="search-form">
              <input
                className="form-control"
                id="city-input"
                autoFocus="on"
                autoComplete="off"
                onChange={updCity}
                type="search"
                placeholder="Type any city..."
                value={city}
              />
            </form>
          </div>
          <div className="weather-active-tab">
            <div className="row mb-2">
              <div className="h1 col-6 mt-3 text-wrap current-city">
                {parameters.city}
              </div>
              <div className="h4 mt-4 col-6 text-end datetime">
                <FormattedDate date={parameters.date} />
              </div>
            </div>

            <WeatherParameters data={parameters} />
          </div>
          <hr />
          <WeatherForecast coords={parameters.coordinates} />
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
}
