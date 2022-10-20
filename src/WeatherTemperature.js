import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("C");
  let temperature = unit === "C" ? props.celcius : props.fahrenheit

  function convertTemp(e) {
    e.preventDefault();
    if (unit === "C") {
      setUnit("F");
      temperature = props.fahrenheit;
    } else {
      setUnit("C");
      temperature = props.celcius;
    }
  }

  return (
    <div className="col-4 col-sm-3 daily-temp">
      <span>{temperature}</span>
      <a className="celsius-link" onClick={convertTemp} href="/">
        {" "}
        °{unit}
      </a>
      <p className="weather-description">{props.description}</p>
    </div>
  );
}
