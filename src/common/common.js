import { v4 as uuid } from "uuid";

export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const hours = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "",
];

export const days = new Array(7).fill("");

export const initBlocks = [
  {
    id: uuid(),
    color: "#616161",
    day: 1,
    from: 0,
    to: 5,
    name: "Working",
    isTemporary: false,
    editMode: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 3,
    from: 15,
    to: 18,
    name: "Fitness",
    isTemporary: false,
    editMode: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 7,
    from: 10,
    to: 12,
    name: "Cook",
    isTemporary: false,
    editMode: false,
  },
];

export const initTempBlock = {
  id: 0,
  color: "#616161",
  day: 0,
  from: 0,
  to: 0,
  name: "Temporary",
  isTemporary: true,
};
