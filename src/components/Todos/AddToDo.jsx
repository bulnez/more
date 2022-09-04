import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import styles from "./Todos.module.css";

const AddTodo = ({ addTodo }) => {
  const initTodo = {
    id: "",
    name: "",
    done: false,
  };
  const [todo, setTodo] = useState(initTodo);

  const handleTodo = (e) => {
    setTodo({ ...todo, name: e.target.value, id: uuid() });
  };

  const clickHandler = (todo) => {
    if (todo.name !== "") {
      addTodo(todo);
      setTodo(initTodo);
    }
  };

  return (
    <div className={styles.addTodoContainer}>
      <p className={styles.text}>or add a new one:</p>
      <div className={styles.fieldContainer}>
        <input
          type="text"
          onChange={handleTodo}
          className={styles.inputField}
          value={todo.name}
        />
        <button onClick={() => clickHandler(todo)} className={styles.btn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
