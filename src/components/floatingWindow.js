import React, { useState } from "react";

function FloatingWindow({ children }) {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    // only left mouse button
    if (e.button !== 0) return;
    setDragging(true);
    setInitialOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.classList.add("prevent-select");
  };

  const handleMouseUp = () => {
    // only left mouse button
    setDragging(false);
    document.body.classList.remove("prevent-select");
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - initialOffset.x,
      y: e.clientY - initialOffset.y,
    });
  };

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
