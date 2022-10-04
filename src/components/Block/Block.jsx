import React, { useState, useEffect } from "react";
import styles from "./Block.module.css";
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
  editMultipleDetails,
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

  const getHour = (x, y) => document.elementFromPoint(x, y).dataset.hourindex;
  const getDay = (x, y) => document.elementFromPoint(x, y).dataset.dayindex;

  const changeColor = (value) => {
    editBlockDetails(id, "color", value);
    setColorPicker(false);
    setIconsActive(false);
  };

  const changeName = (e) => {
    setNewName(e.target.value);
  };

  const startEditingName = () => {
    setEditName(true);
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
    const newTo =
      parseInt(newFrom) + duration > 24 ? 24 : parseInt(newFrom) + duration;
    const nday = parseInt(tempDay) + 1;
    setBlockClone({
      ...blockClone,
      day: nday,
      from: parseInt(tempHour),
      to: newTo,
    });
  };

  const onDragEndHandler = () => {
    const newTo =
      parseInt(newFrom) + duration > 24 ? 24 : parseInt(newFrom) + duration;
    newFrom !== 0 &&
      editMultipleDetails(
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
    <div className={styles.tempBlock} style={{ height: `${duration * 60}px` }}>
      <p className={styles.heading}>{name}</p>
    </div>
  ) : (
    <div
      className={styles.blockContainer}
      style={{
        height: `${duration * 60}px`,
      }}
    >
      <div
        className={styles.block}
        style={{
          height: `${duration * 60}px`,
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
            onChange={changeName}
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
          startEdit={startEditingName}
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
            console.log(hour, from);
            hour && hour > from && setNewHour(hour);
          }}
          onDragEnd={() => {
            setNewHour(0);
            setDragging(false);
          }}
          onMouseEnter={() => {
            setIconsActive(true);
          }}
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
