import React, { useEffect, useState } from "react";
import ShowTask from "./showTodos";
// import ReorderableList from "./reorderList";
import "./tasks.css";

export default function Tasks() {
  const initialTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(initialTodos ? initialTodos : []);
  const [project, setProject] = useState(["Project 1"]);
  const [inputTask, setInputTask] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo = {}) => {
    if (todo) {
      todo = { id: Date.now(), text: inputTask, group: project, isDone: false };
    }
    setInputTask("");
  };

  function handleSubmit(event) {
    event.preventDefault();
    addTodo({
      id: Date.now(),
      text: inputTask,
      group: project,
      isDone: false,
    });
  }
  //todo: press button to show/hide tabs

  // const handleExpansion = (todo) => {
  //   setIsExpanded(todo.id);
  // };

  return (
    <div className="todo-container">
      {/* <ReorderableList items={todos}> */}
      <form className="add-container blur" onSubmit={(e) => handleSubmit(e)}>
        <div className="select-project">
          <select
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Project1">Project 1</option>
            <option value="Project2">Project 2</option>
            <option value="Project3">Project 3</option>
            <option value="Projct4">Project 4</option>
          </select>
          <span className="focus"></span>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputTask}
            onChange={(e) => {
              setInputTask(e.target.value);
            }}
            placeholder="Add TODO"
            className="todo-input"
          />
          <button className="add-button" type="submit">
            Add
          </button>
        </div>
      </form>

      <div className="todo-list blur hideScrollbar resize">
        <ShowTask
          todos={todos}
          setTodos={setTodos}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* </ReorderableList> */}
    </div>
  );
}

//tasks{project1:{task1,task2, task3,task4},project2:{task5,task6,task7},project3:{task8,task9,task10}}
