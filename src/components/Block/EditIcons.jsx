import React from "react";
import styles from "./Block.module.css";
import { FiEdit, FiCheck } from "react-icons/fi";
import { BiColorFill } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

const EditIcons = ({
  iconsActive,
  deleteHandler,
  isEditingActive,
  startEdit,
  editNameSuccess,
  editNameClose,
  showColorPicker,
  colorPicker,
}) => {
  return isEditingActive ? (
    <div className={styles.iconsRowActive}>
      <FiCheck className={styles.icon} onClick={editNameSuccess} />
      <GrFormClose className={styles.icon} onClick={editNameClose} />
    </div>
  ) : (
    <>
      <div className={iconsActive ? styles.iconsRowActive : styles.iconsRow}>
        <FiEdit className={styles.icon} onClick={startEdit} />
        <BiColorFill
          id="color"
          className={styles.icon}
          onClick={() => showColorPicker(!colorPicker)}
        />
        <MdDelete className={styles.icon} onClick={deleteHandler} />
      </div>
    </>
  );
};

export default EditIcons;
