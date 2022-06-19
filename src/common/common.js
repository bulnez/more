export const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const hours = [
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
  "24:00",
];

export const days = new Array(7).fill("");

export const initBlocks = [
  {
    id: 1,
    day: 1,
    from: 7,
    to: 10,
    name: "Working",
    isTemporary: false,
  },
  {
    id: 2,
    day: 3,
    from: 15,
    to: 18,
    name: "Fitness",
    isTemporary: false,
  },
  {
    id: 3,
    day: 7,
    from: 10,
    to: 12,
    name: "Cook",
    isTemporary: false,
  },
];

export const initTempBlock = {
  id: 6,
  day: 0,
  from: 0,
  to: 0,
  name: "Temporary",
  isTemporary: true,
};
