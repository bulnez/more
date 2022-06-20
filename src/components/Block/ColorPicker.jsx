import React, { useState, useEffect } from "react";
import { GoCheck } from "react-icons/go";
import styles from "./Block.module.css";

const ColorPicker = ({ show, color, changeColor }) => {
  const [newColor, setNewColor] = useState(color);

  const setColor = (color) => {
    switch (color) {
      case "tomato":
        return "#D40001";
      case "green":
        return "#0A8143";
      case "yellow":
        return "#F6BE27";
      case "blue":
        return "#3F51B5";
      default:
        return "#616161";
    }
  };

  useEffect(() => {
    newColor !== color && changeColor(setColor(newColor));
  }, [newColor]);

  return (
    show && (
      <div className={styles.colorContainer}>
        <span className={`${styles.colors} ${styles.red}`}>
          <option value="tomato" onClick={(e) => setNewColor(e.target.value)} />
        </span>
        <span className={`${styles.colors} ${styles.blue}`} value="blue">
          <option value="blue" onClick={(e) => setNewColor(e.target.value)} />
          {/* <GoCheck className={styles.check} /> */}
        </span>
        <span className={`${styles.colors} ${styles.green}`} value="green">
          <option value="green" onClick={(e) => setNewColor(e.target.value)} />
        </span>
        <span className={`${styles.colors} ${styles.yellow}`} value="yellow">
          <option value="yellow" onClick={(e) => setNewColor(e.target.value)} />
        </span>
      </div>
    )
  );
};

export default ColorPicker;
