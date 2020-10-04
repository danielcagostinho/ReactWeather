import React from "react";

import "./WeatherCard.css";

const weatherCard = ({ date, tempMax, weather, celsius }) => {
  var cloud = require("../../assets/Cloud.png");
  var overcast = require("../../assets/Overcast.png");
  var rain = require("../../assets/Rain.png");

  // Convert epoch time to date
  let dateString = new Date(0);
  dateString.setUTCSeconds(date);

  let tempMaxString = celsius
    ? Math.round(tempMax - 273.15)
    : Math.round((tempMax * 9) / 5 - 459.67);

  let icon = null;

  switch (weather) {
    case "Clouds":
      icon = <img src={cloud} />;
      break;
    case "Clear":
      icon = <img src={overcast} />;
      break;
    case "Rain":
      icon = <img src={rain} />;
      break;
  }

  return (
    <div className="WeatherCard">
      <p>{dateString.toLocaleString("en-us", { weekday: "short" })}</p>
      {icon}
      <p>{tempMaxString}°</p>
    </div>
  );
};

export default weatherCard;
