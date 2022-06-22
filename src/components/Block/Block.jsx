import React, { useState, useEffect } from "react";
import styles from "./Block.module.css";
import ColorPicker from "./ColorPicker";
import EditIcons from "./EditIcons";

const Block = ({
  name,
  id,
  color,
  from,
  to,
  duration,
  isTemporary,
  deleteHandler,
  editBlockDetails,
}) => {
  const [iconsActive, setIconsActive] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [colorPicker, setColorPicker] = useState(false);
  const [newHour, setNewHour] = useState(0);
  const [dragging, setDragging] = useState(false);

  const getHour = (x, y) => {
    return document.elementFromPoint(x, y).dataset.hourindex;
  };

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

  useEffect(() => {
    newHour && editBlockDetails(id, "to", parseInt(newHour));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newHour]);
  console.log(dragging);
  return isTemporary ? (
    <div
      className={styles.tempBlock}
      style={{ height: `${duration * 31.5}px` }}
    >
      <p className={styles.heading}>{name}</p>
    </div>
  ) : (
    <div
      className={styles.blockContainer}
      style={{
        height: `${duration * 31.5}px`,
      }}
    >
      <div
        className={styles.block}
        style={{
          height: `${duration * 31.5}px`,
          backgroundColor: color,
        }}
        onMouseEnter={() => setIconsActive(true)}
        onMouseLeave={() => !colorPicker && setIconsActive(false)}
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
            {duration > 2 && (
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
            hour && setNewHour(hour);
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
