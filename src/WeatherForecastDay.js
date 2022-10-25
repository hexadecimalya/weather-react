import React from "react";

export default function WeatherForecastDay(props) {
  function maxT() {
    return Math.round(props.data.temp.max);
  }

  function minT() {
    return Math.round(props.data.temp.min);
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  let imgUrl = `http://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`;
  return (
    <div className="WeatherForecastDay col-2 forecast-element">
      <div className="forecast-date">{day()}</div>
      <img src={imgUrl} alt="" width="60" />
      <div className="forecast-temps">
        <span className="forecast-temp-max">{maxT()}° </span> |
        <span className="forecast-temp-min"> {minT()}° </span>
      </div>
    </div>
  );
}
