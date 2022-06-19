import React from "react";
import styles from "./Block.module.css";

const Block = ({ name, duration, clickHandler, isTemporary }) => {
  return isTemporary ? (
    <div
      className={styles.tempBlock}
      style={{ height: `${duration * 31.5}px` }}
      onClick={clickHandler}
    >
      <p className={styles.unselectable}>{name}</p>
    </div>
  ) : (
    <div
      className={styles.block}
      style={{ height: `${duration * 31.5}px` }}
      onClick={clickHandler}
    >
      <p className={styles.unselectable}>{name}</p>
    </div>
  );
};

export default Block;
