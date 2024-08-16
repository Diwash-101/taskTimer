import React from "react";
import useDrag from "./useDrag.js";
function FloatingWindow({ children }) {
  const {
    position,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    dragging,
  } = useDrag();

  return (
    <div
      id="draggable"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
      draggable="false"
      style={{
        position: "absolute",
        left: position.x + "px",
        top: position.y + "px",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      {children}
    </div>
  );
}

export default FloatingWindow;
