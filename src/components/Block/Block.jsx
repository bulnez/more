import React, { useState, useEffect } from "react";
import styles from "./Block.module.css";
import ColorPicker from "./ColorPicker";
import EditIcons from "./EditIcons";

const Block = ({
  name,
  id,
  color,
  duration,
  isTemporary,
  deleteHandler,
  editBlockDetails,
}) => {
  const [iconsActive, setIconsActive] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState(name);
  const [colorPicker, setColorPicker] = useState(false);

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

  return isTemporary ? (
    <div
      className={styles.tempBlock}
      style={{ height: `${duration * 31.5}px` }}
    >
      <p className={styles.heading}>{name}</p>
    </div>
  ) : (
    <>
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
          <p className={styles.heading}>{name}</p>
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
    </>
  );
};

export default Block;
