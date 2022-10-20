import React from "react";
// import Weather from "./Weather";

export default function FormattedDate(props) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[props.date.getMonth()];
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = props.date.getDate();
  let dayOfWeek = daysOfWeek[props.date.getDay()];
  let hours = props.date.getHours();
  console.log(dayOfWeek);
  let minutes = props.date.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;

//   function setCurrentDateTime() {
//     let dateTimeBlock = document.querySelector("#current-datetime");
//     let currentDate = new Date();
//     let dateTime = formatDateTime(currentDate);
//     dateTimeBlock.innerHTML = dateTime;
//   }

  return (
    <div>
      {month} {day}, {dayOfWeek} | {hours}:{minutes}
    </div>
  );
}

