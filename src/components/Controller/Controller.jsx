import React, { useState, useEffect } from "react";
import styles from "./Controller.module.css";

const Controller = ({ currWeek, setCurrWeek, getWeek, year }) => {
  const [week, setWeek] = useState(0);

  useEffect(() => {
    setCurrWeek(getWeek(week));
  }, [week]);

  return (
    <div className={styles.container}>
      <span className={`${styles.year} ${styles.unselectable}`}>
        {currWeek.year}
      </span>
      <div className={styles.names}>
        <p>{`${currWeek.monthNameStart} ${currWeek.start} - ${currWeek.monthNameEnd} ${currWeek.end}`}</p>
      </div>
      <div className={`${styles.arrows} ${styles.unselectable}`}>
        <span className={styles.arrow} onClick={() => setWeek(week - 1)}>
          &lt; prev
        </span>
        <span className={styles.arrow} onClick={() => setWeek(week + 1)}>
          next &gt;
        </span>
      </div>
    </div>
  );
};

export default Controller;
