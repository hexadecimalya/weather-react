import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coords]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (!loaded) {
    let lat = props.coords.lat;
    let lon = props.coords.lon;
    const apiKey = "c92aa008c831e4682122a5ffc70b2cbf";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  } else {
    return (
      <div className="WeatherForecast forecast-block">
        <div className="row">
        {forecast.map(function (dailyForecast, index) {
          if (index < 6) {
            return <WeatherForecastDay data={dailyForecast} />;
          }
        })}
        </div>
      </div>
    );
  }
}
