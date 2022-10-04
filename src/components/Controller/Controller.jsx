import React from "react";
import styles from "./Controller.module.css";

const Controller = ({ currWeek, weekOffset, setWeekOffset }) => {
  return (
    <div className={styles.container}>
      <span className={`${styles.year} ${styles.unselectable}`}>
        {currWeek.year}
      </span>
      <div className={styles.names}>
        <p>{`${currWeek.monthNameStart} ${currWeek.start} - ${currWeek.monthNameEnd} ${currWeek.end}`}</p>
      </div>
      <div className={`${styles.arrows} ${styles.unselectable}`}>
        <span
          className={styles.arrow}
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          &lt; prev
        </span>
        <span
          className={styles.arrow}
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          next &gt;
        </span>
      </div>
    </div>
  );
};

export default Controller;
