import React from "react";

import "./SearchInput.css";

const SearchInput = ({collapsed, input, setInput}) => {
  return (
    <input
      type="text"
      value={input}
      onChange={(newText) => setInput(newText.target.value)}
      className={`SearchInput${!collapsed ? " SearchInputOpen" : " SearchInputClosed"}`}
      placeholder="Search by city name"
    />
  );
};

export default SearchInput;
