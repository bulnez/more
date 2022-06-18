import React, { useState } from "react";
import styles from "./AddBlock.module.css";
import { hours, weekdays } from "../../common/common";

const AddBlock = ({ clickHandler }) => {
  const initState = {
    id: 5,
    name: "",
    day: 1,
    from: 1,
    to: 1,
  };
  const [newBlock, setNewBlock] = useState(initState);

  const handleNameChange = (e) => {
    setNewBlock({ ...newBlock, name: e.target.value });
  };

  const handleDayChange = (e) => {
    console.log(e.target.value);
    setNewBlock({ ...newBlock, day: parseInt(e.target.value) });
  };

  const handleHourFromChange = (e) => {
    console.log(e.target.value);
    setNewBlock({ ...newBlock, from: parseInt(e.target.value) });
  };

  const handleHourToChange = (e) => {
    console.log(e.target.value);
    setNewBlock({ ...newBlock, to: parseInt(e.target.value) });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    clickHandler(newBlock);
    setNewBlock(initState);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label>Name:</label>
      <input type="text" value={newBlock.name} onChange={handleNameChange} />
      <label>Date:</label>
      <select value={newBlock.day} onChange={handleDayChange}>
        {weekdays.map((day, i) => (
          <option value={i + 1}>{day}</option>
        ))}
      </select>
      <label>Hour from:</label>
      <select value={newBlock.from} onChange={handleHourFromChange}>
        {hours.map((hr, i) => (
          <option value={i + 1}>{hr}</option>
        ))}
      </select>
      <label>Hour to:</label>
      <select value={newBlock.to} onChange={handleHourToChange}>
        {hours.map((hr, i) => (
          <option value={i + 1}>{hr}</option>
        ))}
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default AddBlock;
