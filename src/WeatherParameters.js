import React from "react";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherParameters(props) {
  return (
    <div className="Parameters">
      <div className="row">
        <WeatherTemperature celcius = {props.data.temperature} fahrenheit = {props.data.temperature_f} description = {props.data.description}/>
        <div className="col-3 col-sm-5 text-center col-sm-4">
          <img src={props.data.iconUrl} alt={props.data.description} />
        </div>
        <div className="col-5 col-sm-4 pt-0 mb-2">
          <ul className="forecast-parameters text-end">
            <li>
              humidity: <span id="humidity">{props.data.humidity}</span>%
            </li>
            <li>
              pressure: <span id="pressure">{props.data.pressure}</span> hPa
            </li>
            <li>
              wind speed: <span id="wind">{Math.round(props.data.wind)}</span>{" "}
              m/s
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
