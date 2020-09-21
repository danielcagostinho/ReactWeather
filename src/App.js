import React, { Component } from "react";

import WeatherCard from "./components/WeatherCard/WeatherCard";

import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    weathers: [],
    celsius: true
  };

  componentDidMount() {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=9ba589e5a109fb22a3833e80ac287319"
      )
      .then((response) => {
        for (let i = 0; i < response.data.list.length; i+= 8){
          let currentW = response.data.list[i];
          this.setState({
            weathers: this.state.weathers.concat([
              {
                date: currentW.dt,
                tempMax: currentW.main.temp_max,
                weather: currentW.weather[0].main,
              },
            ]),
          })
        }
      });
  }

  toggleUnit = (unit) => {
    if(unit == "C"){
      this.setState({celsius: true});
    } else {
      this.setState({celsius: false});
    }
  }

  render() {
    let weatherDisplay = this.state.weathers.map((weather) => {
      return (
        <WeatherCard
          date={weather.date}
          tempMax={weather.tempMax}
          weather={weather.weather}
          tempMin={weather.tempMin}
          celsius={this.state.celsius}
        />
      );
    });

    return (
      <div className="App">
        <div className="Header">

        <h1 className="Title">5 Day Forecast <span className="Location"> - Toronto, CA</span></h1>
        <div className="ToggleContainer">

        <div className={`ToggleButton${this.state.celsius ? " Toggled" : ""}`} onClick={() => this.toggleUnit("C")}>°C</div>
        <div className={`ToggleButton${!this.state.celsius ? " Toggled" : ""}`} onClick={() => this.toggleUnit("F")}>°F</div>
        </div>
        </div>
        <div className="CardContainer">{weatherDisplay}</div>
        <div className="Footer">
          <p className="FooterText"> created by daniel agostinho</p>
        </div>
      </div>
    );
  }
}

export default App;
