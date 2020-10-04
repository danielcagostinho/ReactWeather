import React, { Component } from "react";

import WeatherCard from "./components/WeatherCard/WeatherCard";

import axios from "axios";

import "./App.css";

import SearchIcon from "./assets/SearchIcon.png";
import UnitButton from "./components/UnitButton/UnitButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weathers: [],
      celsius: true,
      location: "Toronto",
      country: "CA",
      input: "",
      dataLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ dataLoading: true });
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=9ba589e5a109fb22a3833e80ac287319"
      )
      .then((response) => {
        for (let i = 0; i < response.data.list.length; i += 8) {
          let currentW = response.data.list[i];
          this.setState({
            weathers: this.state.weathers.concat([
              {
                date: currentW.dt,
                tempMax: currentW.main.temp_max,
                weather: currentW.weather[0].main,
              },
            ]),
          });
        }
        this.setState({ dataLoading: false });
      });
  }

  toggleUnit = (unit) => {
    if (unit == "C") {
      this.setState({ celsius: true });
    } else {
      this.setState({ celsius: false });
    }
  };

  handleSubmit = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.input}&appid=9ba589e5a109fb22a3833e80ac287319`
      )
      .then((response) => {
        console.log(response.data.list.length);
        let newWeathers = [];
        for (let i = 0; i < response.data.list.length; i += 8) {
          let currentW = response.data.list[i];
          newWeathers.push({
            date: currentW.dt,
            tempMax: currentW.main.temp_max,
            weather: currentW.weather[0].main,
          });
        }
        this.setState({
          weathers: newWeathers,
          location: this.state.input,
          input: "",
        });
      });
  };

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    let weatherDisplay = this.state.weathers.map((weather) => {
      return (
        <WeatherCard
          date={weather.date}
          tempMax={weather.tempMax}
          weather={weather.weather}
          celsius={this.state.celsius}
        />
      );
    });

    return (
      <div className="App">
        <div>
          <div className="Header">
            <h1 className="Title">
              5 Day Forecast{" "}
              <span className="Location">
                {" "}
                - {this.state.location}, {this.state.country}
              </span>
            </h1>
            <div className="ToggleContainer">
              <UnitButton
                toggled={this.state.celsius}
                type="C"
                toggleUnit={this.toggleUnit}
              />
              <UnitButton
                toggled={!this.state.celsius}
                type="F"
                toggleUnit={this.toggleUnit}
              />
            </div>
          </div>
          {!this.state.dataLoading ? (
            <div className="CardContainer">{weatherDisplay}</div>
          ) : (
            <h1>Loading</h1>
          )}
          {/* <div className="SearchBarContainer">
            <img
              src={SearchIcon}
              className="SearchIcon"
              onClick={this.handleSubmit}
            />
            <input
              value={this.state.input}
              onChange={this.handleChange}
              className="SearchBar"
              placeholder="Search Location"
            />
          </div> */}
        </div>
        <div className="Footer">
          <p className="FooterText"> created by daniel agostinho</p>
        </div>
      </div>
    );
  }
}

export default App;
