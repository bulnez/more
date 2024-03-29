import React, { useState, useEffect } from "react";
import styles from "./Block.module.css";
import { cellHeight } from "../../common/common";
import ColorPicker from "./ColorPicker";
import EditIcons from "./EditIcons";

const Block = ({
  name,
  id,
  color,
  day,
  from,
  to,
  duration,
  isTemporary,
  deleteHandler,
  editBlockDetails,
  editPosition,
  setBlockClone,
  blockClone,
}) => {
  const [iconsActive, setIconsActive] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [colorPicker, setColorPicker] = useState(false);
  const [newHour, setNewHour] = useState(0);
  const [newDay, setNewDay] = useState(0);
  const [newFrom, setNewFrom] = useState(0);
  const [dragging, setDragging] = useState(false);

  //Get coordinates of the grid based on the mouse cursor position, when moving a clone block
  const getHour = (x, y) => document.elementFromPoint(x, y).dataset.hourindex;
  const getDay = (x, y) => document.elementFromPoint(x, y).dataset.dayindex;

  const changeColor = (value) => {
    editBlockDetails(id, "color", value);
    setColorPicker(false);
    setIconsActive(false);
  };

  const editNameSuccess = () => {
    newName !== name && editBlockDetails(id, "name", newName);
    setEditName(false);
  };

  const editNameClose = () => {
    setNewName(name);
    setEditName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      editNameSuccess();
    } else if (e.key === "Escape") {
      editNameClose();
    }
  };

  const onDragStartHandler = () => {
    setIconsActive(true);
    setDragging(true);
    setBlockClone({ active: true, day, from, to });
  };

  const onDragHandler = (e) => {
    setIconsActive(true);
    let tempDay = getDay(e.clientX, e.clientY);
    let tempHour = getHour(e.clientX, e.clientY);
    tempDay && setNewDay(parseInt(tempDay) + 1);
    tempHour && setNewFrom(tempHour);
    const to =
      parseInt(newFrom) + duration > 24 ? 24 : parseInt(newFrom) + duration;
    const day = parseInt(tempDay) + 1;
    setBlockClone({
      ...blockClone,
      day,
      from: parseInt(tempHour),
      to,
    });
  };

  const onDragEndHandler = () => {
    const newTo =
      parseInt(newFrom) + duration > 24 ? 24 : parseInt(newFrom) + duration;
    newFrom !== 0 &&
      editPosition(
        id,
        ["day", "from", "to"],
        [parseInt(newDay), parseInt(newFrom), newTo]
      );
    setNewDay(0);
    setNewFrom(0);
    setDragging(false);
    setBlockClone({ ...blockClone, active: false });
  };

  useEffect(() => {
    newHour && editBlockDetails(id, "to", parseInt(newHour));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newHour]);

  return isTemporary ? (
    <div
      className={styles.tempBlock}
      style={{ height: `${duration * cellHeight}px` }}
    />
  ) : (
    <div
      className={styles.blockContainer}
      style={{
        height: `${duration * cellHeight}px`,
      }}
    >
      <div
        className={styles.block}
        style={{
          height: `${duration * cellHeight}px`,
          backgroundColor: color,
        }}
        onMouseEnter={() => setIconsActive(true)}
        onMouseLeave={() => !colorPicker && setIconsActive(false)}
        onDragStart={onDragStartHandler}
        onDrag={onDragHandler}
        onDragEnd={onDragEndHandler}
      >
        {editName ? (
          <textarea
            maxlength="30"
            autoFocus="autofocus"
            value={newName}
            className={styles.nameInput}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={(e) => (e.target.selectionStart = e.target.value.length)}
          />
        ) : (
          <div className={styles.textContainerRow}>
            <p className={styles.heading}>{name}</p>
            {duration > 1 && (
              <p className={styles.hours}>{`${from}:00 - ${to}:00`}</p>
            )}
          </div>
        )}
        <EditIcons
          iconsActive={iconsActive}
          deleteHandler={deleteHandler}
          isEditingActive={editName}
          startEdit={() => setEditName(true)}
          editNameSuccess={editNameSuccess}
          editNameClose={editNameClose}
          showColorPicker={setColorPicker}
          colorPicker={colorPicker}
        />
        {iconsActive && (
          <ColorPicker
            show={colorPicker}
            color={color}
            changeColor={changeColor}
          />
        )}
      </div>
      {iconsActive && (
        <span
          className={`${styles.handle}`}
          onDragStart={() => {
            setIconsActive(true);
            setDragging(true);
          }}
          onDrag={(e) => {
            let hour = getHour(e.clientX, e.clientY);
            hour && hour > from && setNewHour(hour);
          }}
          onDragEnd={() => {
            setNewHour(0);
            setDragging(false);
          }}
          onMouseEnter={() => setIconsActive(true)}
          onMouseLeave={() => !dragging && setIconsActive(false)}
        >
          <p className={styles.arrowIcon} autoFocus="autofocus">
            ↕
          </p>
        </span>
      )}
    </div>
  );
};

export default Block;
