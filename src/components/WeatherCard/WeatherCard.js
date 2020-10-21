import React from "react";

import "./WeatherCard.css";

const weatherCard = ({ date, tempMax, tempMin, weather, celsius }) => {
  var cloud = require("../../assets/Cloud-1.png");
  var overcast = require("../../assets/Overcast-1.png");
  var rain = require("../../assets/Rain-1.png");
  var sun = require("../../assets/Sun-1.png");

  // Convert epoch time to date
  let dateString = new Date(0);
  dateString.setUTCSeconds(date);

  let tempMaxString = celsius
    ? Math.round(tempMax - 273.15)
    : Math.round((tempMax * 9) / 5 - 459.67);

    let tempMinString = celsius
    ? Math.round(tempMin - 273.15)
    : Math.round((tempMin * 9) / 5 - 459.67);

  let icon = null;

  console.log(weather)

  switch (weather) {
    case "Clouds":
      icon = <img src={cloud} alt="Cloud Icon"/>;
      break;
    case "Clear":
      icon = <img src={overcast} alt="Overcast Icon"/>;
      break;
    case "Rain":
      icon = <img src={rain} alt="Rain Icon"/>;
      break;
    case "Sun":
      icon = <img src={sun} alt="Sun Icon"/>;
      break;
    default: 
      icon = null;
      break;
  }

  return (
    <div className="WeatherCard">
      <div className="WeatherCardContent">

      <p className="Date">{dateString.toLocaleString("en-us", { weekday: "short" })}</p>
      {icon}
      <p className="TempMax">{tempMaxString}° <span className="TempMin">{tempMinString}°</span></p>
      </div>
    </div>
  );
};

export default weatherCard;
