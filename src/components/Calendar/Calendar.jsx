import React, { useState, useEffect, useRef } from "react";
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
import Controller from "../Controller/Controller";

const Calendar = () => {
  const getWeek = (week = 0) => {
    const year = moment().year();
    const start = parseInt(
      moment().add(week, "isoWeeks").startOf("isoWeeks").format("DD")
    );
    const weekNum = moment().add(week, "isoWeeks").isoWeek();
    const d = moment().add(week, "isoWeeks").dayOfYear();
    const month =
      start > 25
        ? new Date(year, 0, d).getMonth()
        : new Date(year, 0, d).getMonth() + 1;
    const daysInMonth = moment(month, "MM").daysInMonth();
    let days = [];
    let startDay = start;
    for (let i = 0; i < 7; i++) {
      if (startDay > daysInMonth) {
        startDay = 1;
        days.push(startDay);
        startDay++;
      } else {
        days.push(startDay);
        startDay++;
      }
    }

    const monthNameStart = moment(month, "M").format("MMMM");
    const monthNameEnd =
      days[0] > daysInMonth - 6
        ? moment(month + 1, "M").format("MMMM")
        : moment(month, "M").format("MMMM");

    return {
      year,
      month,
      daysInMonth,
      monthNameStart,
      monthNameEnd,
      week: weekNum,
      start: days[0],
      end: days[6],
      days,
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
  const initWeek = getWeek();
  const [currWeek, setCurrWeek] = useState(initWeek);
  const currWeekDay = moment().isoWeekday();

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
        name: "Change the name on hover",
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

  const refContainer = useRef(null);
  const refTimeStamp = useRef(null);
  const scrollToRef = (ref) =>
    refContainer.current.scrollTo(0, ref.current.offsetTop - 200);

  useEffect(() => {
    scrollToRef(refTimeStamp);
  }, []);

  return (
    <div className={styles.bigContainer}>
      <Controller
        currWeek={currWeek}
        setCurrWeek={setCurrWeek}
        getWeek={getWeek}
      />
      <div className={styles.container}>
        {/* WEEKDAYS */}
        <div className={styles.header}>
          {currWeek.days.map((day, i) => (
            <>
              <div className={styles.weekdays}>
                <span className={styles.date}>{day}</span>
                <p className={styles.weekday}>{weekdays[i]}</p>
              </div>
            </>
          ))}
        </div>
        <div className={styles.innerContainer} ref={refContainer}>
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
              ref={refTimeStamp}
            >
              <span className={styles.circle} />
              <span
                className={styles.arrow}
                style={{
                  marginLeft: `${
                    (currWeekDay !== 1 ? currWeekDay - 1 : 1) * 150
                  }px`,
                }}
              >
                &gt;
              </span>
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
                          name=""
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
    </div>
  );
};

export default Calendar;
