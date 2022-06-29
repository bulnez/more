import React, { useState, useEffect } from "react";
import {
  weekdays,
  hours,
  days,
  initBlocks,
  initTempBlock,
} from "../../common/common";
import Block from "../Block/Block";
import styles from "./Calendar.module.css";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { getNext7Days } from "../../common/getCurrent7Days";
import Controller from "../Controller/Controller";

const Calendar = () => {
  let dayDate = moment().date();
  let currWeekDay = moment().day();
  let daysInMonth = moment().daysInMonth();
  let year = moment().year();

  const getWeek = (week = 0) => {
    let start = moment().add(week, "weeks").startOf("week").format("DD");
    let end = moment().add(week, "weeks").endOf("week").format("DD");
    let weekNum = moment().add(week, "weeks").week();
    return {
      week: weekNum,
      start: parseInt(start) + 1,
      end: parseInt(end) + 1,
    };
  };

  const [blocks, setBlocks] = useState(initBlocks);
  const [tempBlock, setTempBlock] = useState(initTempBlock);
  const [currentPosition, setCurrentPosition] = useState({
    day: 0,
    hr: 0,
  });
  const [blockClone, setBlockClone] = useState({
    active: false,
    day: 0,
    from: 0,
    to: 0,
  });
  const [currWeek, setCurrWeek] = useState(getWeek());
  console.log(currWeek);
  const [date, setDate] = useState(
    getNext7Days(dayDate, currWeekDay, daysInMonth)
  );

  const handleTemporaryBlockDown = (day, hr, week) => {
    const isPlaceOccupied = blocks.some(
      (block) => block.day === day && block.from === hr && block.week === week
    );
    !isPlaceOccupied &&
      setTempBlock({
        ...tempBlock,
        isTemporary: true,
        day,
        from: hr,
        week: currWeek.week,
      });
  };

  const handleTemporaryBlockMove = (day, hr) => {
    setCurrentPosition({ ...currentPosition, day, hr });
    if (tempBlock.isTemporary) {
      setTempBlock({ ...tempBlock, to: hr });
    }
  };

  const handleTemporaryBlockUp = () => {
    tempBlock.from &&
      setTempBlock({
        ...tempBlock,
        id: uuid(),
        isTemporary: false,
        name: "Not temporary",
        week: currWeek.week,
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
    console.log(newState);
    setBlocks(newState);
  };

  const editMultipleDetails = (id, detailsArr, valuesArr) => {
    const newState = blocks.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          [detailsArr[0]]: valuesArr[0],
          [detailsArr[1]]: valuesArr[1],
          [detailsArr[2]]: valuesArr[2],
          //Need to make it scalable, not hardcoded
        };
      }
      return block;
    });
    console.log(newState);
    setBlocks(newState);
  };

  useEffect(() => {
    if (
      tempBlock !== initTempBlock &&
      !tempBlock.isTemporary &&
      tempBlock.to - tempBlock.from > 0
    ) {
      setBlocks([...blocks, tempBlock]);
      setTempBlock(initTempBlock);
    } else if (!tempBlock.isTemporary && tempBlock.to - tempBlock.from < 2) {
      setTempBlock(initTempBlock);
    }
  }, [tempBlock, blocks]);

  return (
    <>
      <Controller
        currWeek={currWeek}
        setCurrWeek={setCurrWeek}
        getWeek={getWeek}
        year={year}
      />
      <div className={styles.container}>
        {/* WEEKDAYS */}
        <div className={styles.header}>
          {date.map((date) => (
            <>
              <div className={styles.weekdays}>
                <span className={styles.date}>{date.day}</span>
                <p className={styles.weekday}>{weekdays[date.weekday - 1]}</p>
              </div>
            </>
          ))}
        </div>
        <div className={styles.innerContainer}>
          {/* HOURS */}
          <div className={styles.hours}>
            {hours.map((hr) => (
              <div className={styles.hour}>
                <p className={styles.hr}>{hr}</p>
              </div>
            ))}
          </div>
          <div className={styles.grid}>
            {/* DAYS */}
            <div
              className={styles.timeStamp}
              style={{ marginTop: `${moment().hour() * 60}px` }}
            >
              <span className={styles.circle} />
              <div className={styles.timeStampLine} />
            </div>
            {days.map((day, dayIndex) => (
              <div className={styles.dailyHours}>
                {hours.map((hr, hoursIndex) => (
                  <div
                    className={styles.dailyHour}
                    data-dayIndex={dayIndex}
                    data-hourIndex={hoursIndex}
                    onMouseDown={() =>
                      handleTemporaryBlockDown(
                        dayIndex + 1,
                        hoursIndex,
                        currWeek.week
                      )
                    }
                    onMouseMove={() =>
                      handleTemporaryBlockMove(dayIndex + 1, hoursIndex)
                    }
                    onMouseUp={handleTemporaryBlockUp}
                  >
                    {/* BLOCKS */}
                    {blocks.map(
                      (block) =>
                        block.day === dayIndex + 1 &&
                        block.from === hoursIndex &&
                        block.week === currWeek.week && (
                          <Block
                            id={block.id}
                            isTemporary={block.isTemporary}
                            name={block.name}
                            color={block.color}
                            day={block.day}
                            from={block.from}
                            to={block.to}
                            duration={block.to - block.from}
                            deleteHandler={() => deleteBlock(block.id)}
                            editBlockDetails={editBlockDetails}
                            editMultipleDetails={editMultipleDetails}
                            currentPosition={currentPosition}
                            blockClone={blockClone}
                            setBlockClone={setBlockClone}
                          />
                        )
                    )}
                    {/* TEMPORARY BLOCK */}
                    {tempBlock.day === dayIndex + 1 &&
                      tempBlock.from === hoursIndex && (
                        <Block
                          isTemporary={tempBlock.isTemporary}
                          name="temporary"
                          duration={tempBlock.to - tempBlock.from}
                        />
                      )}
                    {/* CLONE BLOCK */}
                    {blockClone.active &&
                      blockClone.day === dayIndex + 1 &&
                      blockClone.from === hoursIndex && (
                        <Block
                          isTemporary={blockClone.active}
                          duration={blockClone.to - blockClone.from}
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
    </>
  );
};

export default Calendar;
