import React from "react";
import { useReorderableList } from "./reorderList";

export default function ShowTask({ todos = [], setTodos }) {
  const { listItems, handleDragStart, handleDrop } = useReorderableList(todos);
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <ul>
      {listItems.length > 0 ? (
        listItems.map((todo, index) => (
          <li
            key={todo.id}
            className="todo-item"
            onClick={(e) => e.stopPropagation()}
            onDragStart={(e) => {
              e.stopPropagation();
              handleDragStart(index);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            draggable="true"
          >
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => toggleComplete(todo.id)}
            />
            <label htmlFor={todo.id}>
              <div className={`task ${todo.isDone ? "completed" : ""}`}>
                {todo.text}
              </div>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))
      ) : (
        <li>No tasks available</li>
      )}
    </ul>
  );
}
