import { v4 as uuid } from "uuid";

export const cellHeight = 60;

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

export const initBlocks = [
  {
    id: uuid(),
    color: "#616161",
    day: 1,
    from: 0,
    to: 5,
    week: 36,
    name: "Working",
    isTemporary: false,
  },
  {
    id: uuid(),
    color: "#0A8143",
    day: 3,
    from: 15,
    to: 18,
    week: 36,
    name: "Fitness",
    isTemporary: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 7,
    from: 10,
    to: 12,
    week: 36,
    name: "Cook",
    isTemporary: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 7,
    from: 10,
    to: 12,
    week: 37,
    name: "Cook",
    isTemporary: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 7,
    from: 10,
    to: 12,
    week: 37,
    name: "Cook",
    isTemporary: false,
  },
  {
    id: uuid(),
    color: "#616161",
    day: 7,
    from: 10,
    to: 12,
    week: 37,
    name: "Cook",
    isTemporary: false,
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

export const initBlockCloneState = {
  active: false,
  day: 0,
  from: 0,
  to: 0,
};

export const initTodos = [
  { id: uuid(), name: "Buy groceries", done: false },
  { id: uuid(), name: "Go to dentist", done: false },
  { id: uuid(), name: "Run outside for 30 mins", done: true },
  { id: uuid(), name: "Read 30 pages", done: false },
  { id: uuid(), name: "Cook dinner (eggs & bacon)", done: false },
];
