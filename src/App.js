import React, { Component } from "react";

import axios from "axios";

import "./App.css";

import UnitButton from "./components/UnitButton/UnitButton";
import SearchBar from "./components/SearchBar/SearchBar";
import Forecast from "./components/Forecast/Forecast";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weathers: [],
      celsius: true,
      location: "Toronto",
      country: "CA",
      dataLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("[App.js] ComponentDidMount...");
    this.setState({ dataLoading: true });
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=9ba589e5a109fb22a3833e80ac287319"
      )
      .then((response) => {
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
          country: response.data.city.country,
          dataLoading: false,
        });
      });
  }

  toggleUnit = (unit) => {
    if (unit === "C") {
      this.setState({ celsius: true });
    } else {
      this.setState({ celsius: false });
    }
  };

  handleSubmit = (input) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=9ba589e5a109fb22a3833e80ac287319`
      )
      .then((response) => {
        let newWeathers = [];
        for (let i = 0; i < response.data.list.length; i += 8) {
          let currentW = response.data.list[i];
          newWeathers.push({
            date: currentW.dt,
            tempMax: currentW.main.temp_max,
            weather: currentW.weather[0].main,
          });
        }
        console.log(newWeathers);
        this.setState({
          weathers: newWeathers.splice(0, 5),
          location: input,
          country: response.data.city.country,
        });
      });
  };


  render() {
    return (
      <div className="App">
        <div className="Content">
          <div className="Header">
            <SearchBar
              handleSubmit={(input) => this.handleSubmit(input)}
            />
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
            <Forecast
              location={this.state.location}
              weathers={this.state.weathers}
              celsius={this.state.celsius}
              country={this.state.country}
              toggleUnit={this.toggleUnit}
              dataLoading={this.dataLoading}
            />
          ) : (
            <h1>Loading</h1>
          )}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
