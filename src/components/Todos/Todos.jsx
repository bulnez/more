import React, { useState } from "react";
import { initTodos } from "../../common/common";
import AddTodo from "./AddToDo";
import DoneIcon from "./DoneIcon";
import NotDoneIcon from "./NotDoneIcon";
import styles from "./Todos.module.css";

const Todos = () => {
  const [todos, setTodos] = useState(initTodos);

  const setDone = (id, done) => {
    //Praq nov obekt za da otgovarq na immutabilityto
    const newState = todos.map((todo) =>
      todo.id === id ? { ...todo, done } : todo
    );
    setTodos(newState);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <>
      <div className={styles.container}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`${styles.todo} ${todo.done ? styles.todoDone : ""}`}
          >
            {todo.done ? (
              <DoneIcon setDone={setDone} todo={todo} />
            ) : (
              <NotDoneIcon setDone={setDone} todo={todo} />
            )}
            <p className={todo.done ? styles.done : ""}>{todo.name}</p>
          </div>
        ))}
      </div>
      <AddTodo addTodo={addTodo} />
    </>
  );
};

export default Todos;
