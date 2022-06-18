import React from "react";
import styles from "./Block.module.css";

const Block = ({ name, duration, clickHandler }) => {
  return (
    <div
      className={styles.block}
      style={{ height: `${duration * 50}px` }}
      onClick={clickHandler}
    >
      {name}
    </div>
  );
};

export default Block;
