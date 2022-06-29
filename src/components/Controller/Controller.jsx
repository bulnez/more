import React, { useState, useEffect } from "react";
import styles from "./Controller.module.css";

const Controller = ({ currWeek, setCurrWeek, getWeek, year }) => {
  const [week, setWeek] = useState(0);
  useEffect(() => {
    setCurrWeek(getWeek(week));
  }, [week]);

  return (
    <div className={styles.container}>
      <span className={styles.arrow} onClick={() => week && setWeek(week - 1)}>
        &lt;
      </span>
      <p
        className={styles.month}
      >{`June ${currWeek.start} - July ${currWeek.end}`}</p>
      <p className={styles.year}>{year}</p>
      <span className={styles.arrow} onClick={() => setWeek(week + 1)}>
        {" "}
        &gt;
      </span>
    </div>
  );
};

export default Controller;
