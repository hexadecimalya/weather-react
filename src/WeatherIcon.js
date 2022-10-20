import React from "react";



export default function WeatherIcon(props){
    
    let imageUrl = `http://openweathermap.org/img/wn/${props.icon}@2x.png`;

         return (
             <div className="weatherIcon"><img src="{imageUrl}" alt="Weather Icon"/></div>
         
             );
}