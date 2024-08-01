import React, { useEffect, useState } from "react";
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
    if (inputTask.trim() !== "") {
      setTodos([...todos, todo]);
      // localStorage.setItem("todos", JSON.stringify(todos));
      setInputTask("");
    }
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const getTodo = (id) => {
    return todos.filter((todo) => todo.id === id);
  };

  const handleComplete = (id) => {
    let completedTodo = getTodo(id);
    deleteTodo(id);
    completedTodo[0].isDone = !completedTodo[0].isDone;
    addTodo(completedTodo);
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

  const ShowTask = (todo) => {
    return (
      <li key={todo.id} className="todo-item">
        <input
          type="checkbox"
          className="delete-button"
          id={todo.id}
          checked={todo.isDone}
          onChange={(e) => handleComplete(e.target.id)}
        />
        <label htmlFor={todo.id}>
          <div className="task">{todo.text}</div>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="delete-button"
          ></button>
        </label>
      </li>
    );
  };

  return (
    <div className="todo-container">
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

      <div className="todo-list blur hideScrollbar">
        <ul>{todos.map((todo) => ShowTask(todo))}</ul>
      </div>
    </div>
  );
}

//tasks{project1:{task1,task2, task3,task4},project2:{task5,task6,task7},project3:{task8,task9,task10}}
