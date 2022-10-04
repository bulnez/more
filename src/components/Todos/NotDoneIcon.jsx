import React from "react";
import styles from "./Todos.module.css";

const NotDoneIcon = ({ setDone, todo }) => {
  return (
    <svg height="30" width="30">
      <circle
        className={styles.circle}
        cx="15"
        cy="15"
        r="10"
        stroke="grey"
        strokeWidth="2"
        fill="transparent"
        onClick={() => setDone(todo.id, true)}
      />
    </svg>
  );
};

export default NotDoneIcon;
