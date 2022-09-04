import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Todos.module.css";

const Todos = () => {
  const [todos, setTodos] = useState([
    { id: uuid(), name: "Groceries", done: true },
    { id: uuid(), name: "Dentist", done: false },
    { id: uuid(), name: "Running", done: false },
    { id: uuid(), name: "Running", done: false },
    { id: uuid(), name: "Running", done: false },
  ]);

  const markDone = (i) => {
    const newState = [...todos];
    newState[i].done = true;
    setTodos(newState);
  };

  const markUndone = (i) => {
    const newState = [...todos];
    newState[i].done = false;
    setTodos(newState);
  };

  return (
    <div className={styles.container}>
      {todos.map((todo, i) => (
        <div className={`${styles.todo} ${todo.done && styles.todoDone}`}>
          {todo.done ? (
            <svg
              className={styles.circle}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
              onClick={() => markUndone(i)}
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ) : (
            <svg height="30" width="30" className={styles.circle}>
              <circle
                cx="15"
                cy="15"
                r="10"
                stroke="grey"
                stroke-width="2"
                fill="transparent"
                onClick={() => markDone(i)}
              />
            </svg>
          )}
          <p className={`${todo.done ? styles.done : ""}`}>{todo.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
