import React from "react";
import Todos from "../Todos/Todos";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p>MORE &gt;</p>
      </div>
      <div className={styles.profilePicture}>
        <img src="profile.jpg" alt="profile" />
        <p>Hello, Stefan</p>
      </div>
      <div className={styles.todoList}>
        <p>here are your tasks for the day: </p>
        <Todos />
      </div>
    </div>
  );
};

export default Sidebar;
