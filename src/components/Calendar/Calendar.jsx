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
import { v4 as uuid } from "uuid";

const Calendar = () => {
  const [blocks, setBlocks] = useState(initBlocks);
  const [tempBlock, setTempBlock] = useState(initTempBlock);

  const handleParentClick = (newBlock) => {
    setBlocks([...blocks, newBlock]);
  };

  const handleTemporaryBlockDown = (day, hr) => {
    const isPlaceOccupied = blocks.some(
      (block) => block.day === day && block.from === hr
    );
    !isPlaceOccupied &&
      setTempBlock({ ...tempBlock, isTemporary: true, day, from: hr });
  };

  const handleTemporaryBlockMove = (hr) => {
    if (tempBlock.isTemporary && tempBlock.from !== 0) {
      setTempBlock({ ...tempBlock, to: hr + 1 });
    }
  };

  const handleTemporaryBlockUp = () => {
    tempBlock.from &&
      setTempBlock({
        ...tempBlock,
        id: uuid(),
        isTemporary: false,
        name: "Not temporary",
      });
  };

  const deleteBlock = (id) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };

  const editBlockDetails = (id, detail, value) => {
    const newState = blocks.map((block) => {
      if (block.id === id) {
        return { ...block, [detail]: value };
      }
      return block;
    });
    setBlocks(newState);
  };

  useEffect(() => {
    if (tempBlock !== initTempBlock && !tempBlock.isTemporary) {
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
                    onMouseUp={handleTemporaryBlockUp}
                  >
                    {/* BLOCKS */}
                    {blocks.map(
                      (block) =>
                        block.day === dayIndex + 1 &&
                        block.from === hoursIndex + 1 && (
                          <Block
                            id={block.id}
                            isTemporary={block.isTemporary}
                            name={block.name}
                            color={block.color}
                            duration={block.to - block.from}
                            deleteHandler={() => deleteBlock(block.id)}
                            editBlockDetails={editBlockDetails}
                          />
                        )
                    )}
                    {/* TEMPORARY BLOCK */}
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
