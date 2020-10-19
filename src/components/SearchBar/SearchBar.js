import React, { useState } from "react";

import SearchIcon from "../../assets/SearchCircle-1.png";
import SearchInput from "../SearchInput/SearchInput";

import "./SearchBar.css";

const SearchBar = ({ handleSubmit }) => {
  
  const [collapsed, setCollapsed] = useState(false);
  
  const [input, setInput] = useState("");
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
      <div className={`SearchIconContainer${!collapsed ? " SearchBarOpen" : " SearchBarClosed"}`}>
        <img src={SearchIcon} className="SearchIcon" onClick={toggleSearch} alt="Search Icon"/>
        <SearchInput collapsed={collapsed} input={input} setInput={setInput}/>
      </div>
    </form>
  );
};

export default SearchBar;
