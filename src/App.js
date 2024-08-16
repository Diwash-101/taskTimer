import "./App.css";
import Timer from "./components/timer";
import Tasks from "./components/tasks";
import FloatingWindow from "./components/floatingWindow";
import BottomBar from "./components/bottomBar";
import { useState } from "react";
function App() {
  const [activeComponents, setActiveComponents] = useState([]);

  const handleCheckboxChange = (id) => {
    setActiveComponents((prevActiveComponents) =>
      prevActiveComponents.includes(id)
        ? prevActiveComponents.filter((component) => component !== id)
        : [...prevActiveComponents, id]
    );
  };
  const componentMap = {
    timer: <Timer />,
    tasks: <Tasks />,
  };
  return (
    <div className="homePage">
      {activeComponents.map((componentId) => (
        <FloatingWindow key={componentId}>
          {componentMap[componentId]}
        </FloatingWindow>
      ))}
      <BottomBar
        activeComponents={activeComponents}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

export default App;
