import React, { useState } from "react";

import "./UnitButton.css";

const UnitButton = (props) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div
      className={`ToggleButton${props.toggled ? " Toggled" : ""}`}
      onClick={() => props.toggleUnit(props.type)}
    >
      {"°" + props.type}
    </div>
  );
};

export default UnitButton;
