import React from "react";
import "./bottomBar.css";

function BottomBar({ activeComponents, handleCheckboxChange }) {
  function Icon({ id }) {
    return (
      <div className="icon">
        <input
          type="checkbox"
          id={id}
          checked={activeComponents.includes(id)}
          onChange={() => handleCheckboxChange(id)}
        />
        <label htmlFor={id}>
          <div className="serverIcon">
            {id}
            <div className="Wrapper"></div>
          </div>
        </label>
      </div>
    );
  }
  return (
    <div className="Sidebar blur">
      <Icon id="timer" />
      <Icon id="tasks" />
    </div>
  );
}

export default BottomBar;
