import React, { Component } from "react";

import axios from "axios";

import "./App.css";

import UnitButton from "./components/UnitButton/UnitButton";
import SearchBar from "./components/SearchBar/SearchBar";
import Forecast from "./components/Forecast/Forecast";
import Footer from "./components/Footer/Footer";
import { getWeather } from "./utils/utils";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Spinner from "./components/Spinner/Spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weathers: [],
      celsius: true,
      location: "Toronto",
      country: "CA",
      dataLoading: false,
      error: false,
      searchOpen: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ dataLoading: true });
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=9ba589e5a109fb22a3833e80ac287319"
      )
      .then((response) => {
        this.setState({
          weathers: getWeather(response).splice(0, 5),
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

  toggleSearch = () => {
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  handleSubmit = (input) => {
    this.setState({ dataLoading: true });
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=9ba589e5a109fb22a3833e80ac287319`
      )
      .then((response) => {
        this.setState({
          weathers: getWeather(response).splice(0, 5),
          location: input,
          country: response.data.city.country,
          dataLoading: false,
          searchOpen: false,
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          input: "",
          dataLoading: false,
          error: true,
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
              error={this.state.error}
              opened={this.state.searchOpen}
              toggleSearch={this.toggleSearch}
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
          {this.state.dataLoading ? (
            <div className="SpinnerContainer">
              <Spinner />
            </div>
          ) : this.state.error ? (
            <ErrorMessage />
          ) : (
            <Forecast
              location={this.state.location}
              weathers={this.state.weathers}
              celsius={this.state.celsius}
              country={this.state.country}
              toggleUnit={this.toggleUnit}
              dataLoading={this.dataLoading}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
