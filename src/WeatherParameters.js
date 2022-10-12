import React from "react";
import FormattedDate from "./FormattedDate";
import Weather from "./Weather";

export default function WeatherParameters(props){
    return(
        <div className="Parameters">
          <div className="col-4 col-sm-3 daily-temp">
            <span>{Math.round(temperature)}</span>
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
                humidity: <span id="humidity">{humidity}</span>%
              </li>
              <li>
                pressure: <span id="pressure">{pressure}</span> hPa
              </li>
              <li>
                wind speed: <span id="wind">{Math.round(wind)}</span>{" "}
                m/s
              </li>
            </ul>
          </div>
        </div>
    )
}