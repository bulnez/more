import React, { useState } from "react";
import { weekdays, hours, days, initBlocks } from "../../common/common";
import AddBlock from "../AddBlock/AddBlock";
import Block from "../Block/Block";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [blocks, setBlocks] = useState(initBlocks);

  const handleParentClick = (newBlock) => {
    setBlocks([...blocks, newBlock]);
    console.log(blocks);
  };

  return (
    <>
      <div className={styles.container}>
        {/* WEEKDAYS */}
        <div className={styles.header}>
          {weekdays.map((weekday) => (
            <div className={styles.weekdays}>{weekday}</div>
          ))}
        </div>
        {/* WEEKDAYS */}
        <div className={styles.innerContainer}>
          {/* HOURS */}
          <div className={styles.hours}>
            {hours.map((hr) => (
              <div className={styles.hour}>{hr}</div>
            ))}
          </div>
          {/* HOURS */}
          <div className={styles.grid}>
            {/* DAYS */}
            {days.map((day, dayIndex) => (
              <div className={styles.dailyHours}>
                {hours.map((hr, hoursIndex) => (
                  <div className={styles.dailyHour}>
                    {/* BLOCKS */}
                    {blocks.map(
                      (block) =>
                        block.day === dayIndex + 1 &&
                        block.from === hoursIndex + 1 && (
                          <Block
                            name={block.name}
                            duration={block.to - block.from}
                          />
                        )
                    )}
                  </div>
                ))}
              </div>
            ))}
            {/* DAYS */}
          </div>
        </div>
      </div>
      <AddBlock clickHandler={handleParentClick} />
    </>
  );
};

export default Calendar;
