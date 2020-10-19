import React from "react";

import "./UnitButton.css";

const UnitButton = (props) => {
  return (
    <div
      className={`ToggleButton${props.toggled ? " UnitToggled" : ""}`}
      onClick={() => props.toggleUnit(props.type)}
    >
      {"°" + props.type}
    </div>
  );
};

export default UnitButton;
