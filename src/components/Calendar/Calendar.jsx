import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";
import useWeek from "../../hooks/useWeek";
import {
  weekdays,
  hours,
  initBlocks,
  initBlockCloneState,
  cellHeight,
} from "../../common/common";
import Block from "../Block/Block";
import styles from "./Calendar.module.css";
import Controller from "../Controller/Controller";

const initTempBlock = {
  id: 0,
  color: "#616161",
  day: 0,
  from: 0,
  to: 0,
  name: "",
  isTemporary: true,
};

const Calendar = () => {
  const refContainer = useRef(null);
  const refTimeStamp = useRef(null);

  const [weekOffset, setWeekOffset] = useState(0);
  const [blocks, setBlocks] = useState(initBlocks);
  const [tempBlock, setTempBlock] = useState(initTempBlock);
  const [currentPosition, setCurrentPosition] = useState({ day: 0, hr: 0 });
  const [blockClone, setBlockClone] = useState(initBlockCloneState);

  const currWeek = useWeek(weekOffset);

  const handleTemporaryBlockDown = (day, hr, week) => {
    const isPlaceOccupied = blocks.some(
      (block) => block.day === day && block.from === hr && block.week === week
    );
    if (!isPlaceOccupied)
      setTempBlock({
        ...tempBlock,
        isTemporary: true,
        day,
        from: hr,
        week: currWeek.week,
      });
  };

  const handleTemporaryBlockMove = (day, hr) => {
    setCurrentPosition({ day, hr });
    if (tempBlock.isTemporary) {
      setTempBlock({ ...tempBlock, to: hr });
    }
  };

  const handleTemporaryBlockUp = () => {
    if (tempBlock.from)
      setTempBlock({
        ...tempBlock,
        id: uuid(),
        isTemporary: false,
        name: "Example name",
        week: currWeek.week,
      });
  };

  const deleteBlock = (id) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(newBlocks);
  };

  const editBlockDetails = (id, detail, value) => {
    //Edit handler for color or name
    const newState = blocks.map((block) => {
      if (block.id === id) {
        return { ...block, [detail]: value };
      }
      return block;
    });
    setBlocks(newState);
  };

  const editPosition = (id, detailsArr, valuesArr) => {
    //Edit the day, start hour and end hour when dragging a block
    const newState = blocks.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          [detailsArr[0]]: valuesArr[0],
          [detailsArr[1]]: valuesArr[1],
          [detailsArr[2]]: valuesArr[2],
        };
      }
      return block;
    });
    setBlocks(newState);
  };

  useEffect(() => {
    //Responsible for handling the temporary blocks
    if (
      tempBlock !== initTempBlock &&
      !tempBlock.isTemporary &&
      tempBlock.to - tempBlock.from > 0
    ) {
      setBlocks([...blocks, tempBlock]);
      setTempBlock(initTempBlock);
    } else if (!tempBlock.isTemporary && tempBlock.to > tempBlock.from) {
      setTempBlock(initTempBlock);
    }
  }, [tempBlock, blocks]);

  useEffect(() => {
    refContainer.current.scrollTo(0, refTimeStamp.current.offsetTop - 200);
  }, []);

  /* 
  ---WEEKDAYS: The top section of the calendar, where weekdays are shown from MON to SUN with the calendar days (e.g. 01-06)
  ---HOURS: The left section of the calendar, where the hours from 00:00 to 23:00 are shown
  ---TIMESTAMP: The red line with a big red dot which indicates the weekday as well as the current round hour
  ---GRID: The grid where the time blocks are shown
  ---BLOCKS: All of the time blocks for the current week
  ---TEMPORARY BLOCK: Whenever the user starts a block on mouse click on the grid, it is shown as a transparent block. On mouse up, 
  the temporary block becomes a non-temporary or just block. There can be only ONE active temporary block.
  ---CLONE BLOCK: Whenever the user tries to move a block through the grid, on mouse click and move it is shown as a transparent one.
  On mouse up, the block takes the place of the clone block and the clone block dissapears.
  */

  return (
    <div className={styles.bigContainer}>
      <Controller
        currWeek={currWeek}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
      />
      <div className={styles.container}>
        {/* WEEKDAYS */}
        <div className={styles.header}>
          {currWeek.days.map((day, i) => (
            <div className={styles.weekdays} key={i}>
              <span className={styles.date}>{day}</span>
              <p className={styles.weekday}>{weekdays[i]}</p>
            </div>
          ))}
        </div>
        <div className={styles.innerContainer} ref={refContainer}>
          {/* HOURS */}
          <div className={styles.hours}>
            {hours.map((hr, i) => (
              <div className={styles.hour} key={i}>
                <p className={styles.hr}>{hr}</p>
              </div>
            ))}
          </div>
          <div className={styles.grid}>
            {/* TIMESTAMP */}
            <div
              className={styles.timeStamp}
              style={{ marginTop: `${moment().hour() * cellHeight}px` }}
              ref={refTimeStamp}
            >
              <span
                className={styles.circle}
                style={{
                  marginLeft: `${(moment().isoWeekday() - 1) * 150}px`,
                }}
              />
              <div className={styles.timeStampLine} />
            </div>
            {/* GRID */}
            {currWeek.days.map((_, dayIndex) => (
              <div className={styles.dailyHours} key={dayIndex}>
                {hours.map((_, hoursIndex) => (
                  <div
                    key={hoursIndex}
                    className={styles.dailyHour}
                    data-dayindex={dayIndex}
                    data-hourindex={hoursIndex}
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
                      (block, i) =>
                        block.day === dayIndex + 1 &&
                        block.from === hoursIndex &&
                        block.week === currWeek.week && (
                          <Block
                            id={block.id}
                            key={i}
                            isTemporary={block.isTemporary}
                            name={block.name}
                            color={block.color}
                            day={block.day}
                            from={block.from}
                            to={block.to}
                            duration={block.to - block.from}
                            deleteHandler={() => deleteBlock(block.id)}
                            editBlockDetails={editBlockDetails}
                            editPosition={editPosition}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
