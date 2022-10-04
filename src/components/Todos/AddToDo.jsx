import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Todos.module.css";

const AddTodo = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const clickHandler = () => {
    if (todo !== "") {
      addTodo({ id: uuid(), name: todo, done: false });
      setTodo("");
    }
  };

  return (
    <div className={styles.addTodoContainer}>
      <p className={styles.text}>or add a new one:</p>
      <div className={styles.fieldContainer}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          className={styles.inputField}
          value={todo}
        />
        <button onClick={clickHandler} className={styles.btn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
