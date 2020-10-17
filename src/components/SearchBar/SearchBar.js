import React, { useState } from "react";

import SearchIcon from "../../assets/SearchCircle-1.png";

import "./SearchBar.css";

const SearchBar = ({ handleSubmit }) => {
  const [input, setInput] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit(input);
    setInput("");
    setCollapsed(true);
  };

  const toggleSearch = () => {
    setCollapsed(!collapsed);
  };

  return (
    <form className="SearchBarContainer" onSubmit={submitHandler}>
      <div className={`SearchIconContainer${!collapsed ? " SearchIconOpen" : " SearchIconClosed"}`}>
        <img src={SearchIcon} className="SearchIcon" onClick={toggleSearch} />
      <input
        type="text"
        value={input}
        onChange={(newText) => setInput(newText.target.value)}
        className={`SearchBar${!collapsed ? " SearchOpen" : " SearchClosed"}`}
        placeholder="Search by city name"
      />
      </div>
    </form>
  );
};

export default SearchBar;
