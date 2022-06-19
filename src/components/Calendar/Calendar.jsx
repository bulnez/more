import React, { useState, useEffect } from "react";
import {
  weekdays,
  hours,
  days,
  initBlocks,
  initTempBlock,
} from "../../common/common";
import AddBlock from "../AddBlock/AddBlock";
import Block from "../Block/Block";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [blocks, setBlocks] = useState(initBlocks);
  const [tempBlock, setTempBlock] = useState(initTempBlock);

  const handleParentClick = (newBlock) => {
    setBlocks([...blocks, newBlock]);
  };

  const handleTemporaryBlockDown = (day, hr) => {
    setTempBlock({ ...tempBlock, isTemporary: true, day, from: hr });
  };

  const handleTemporaryBlockMove = (hr) => {
    if (tempBlock.isTemporary) {
      setTempBlock({ ...tempBlock, to: hr + 1 });
      console.log("asdasd");
    }
  };

  const handleTemporaryBlockUp = (endHour) => {
    setTempBlock({
      ...tempBlock,
      isTemporary: false,
      name: "Not temporary",
    });
  };

  useEffect(() => {
    if (!tempBlock.isTemporary) {
      setBlocks([...blocks, tempBlock]);
      setTempBlock(initTempBlock);
    }
  }, [tempBlock, blocks]);

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
                  <div
                    className={styles.dailyHour}
                    onMouseDown={() =>
                      handleTemporaryBlockDown(dayIndex + 1, hoursIndex + 1)
                    }
                    onMouseMove={() => handleTemporaryBlockMove(hoursIndex + 1)}
                    onMouseUp={() => handleTemporaryBlockUp(hoursIndex + 1)}
                  >
                    {/* BLOCKS */}
                    {blocks.map(
                      (block) =>
                        block.day === dayIndex + 1 &&
                        block.from === hoursIndex + 1 && (
                          <Block
                            isTemporary={block.isTemporary}
                            name={block.name}
                            duration={block.to - block.from}
                          />
                        )
                    )}
                    {tempBlock.day === dayIndex + 1 &&
                      tempBlock.from === hoursIndex + 1 && (
                        <Block
                          isTemporary={tempBlock.isTemporary}
                          name="temporary"
                          duration={tempBlock.to - tempBlock.from}
                        />
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
