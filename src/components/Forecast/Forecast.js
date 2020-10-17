import React from "react";

import "./Forecast.css";

import WeatherCard from "../../components/WeatherCard/WeatherCard";

const Forecast = ({ location, weathers, celsius, country, dataLoading }) => {
  let weatherDisplay = weathers.map((weather) => {
    return (
      <WeatherCard
        key={weather.date}
        date={weather.date}
        tempMax={weather.tempMax}
        weather={weather.weather}
        celsius={celsius}
      />
    );
  });

  return (
    <div className="Forecast">
      <div className="ForecastTitleContainer">
        <h1 className="ForecastTitle">
          5 Day Forecast{" "}
          <span className="ForecastLocation">
            {" "}
            - {location}, {country}
          </span>
        </h1>
      </div>
      <div className="CardContainer">{weatherDisplay}</div>
    </div>
  );
};

export default Forecast;
