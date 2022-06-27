export const getNext7Days = (startDate, initWeekday, daysInMonth) => {
  let startDay = startDate;
  let startWeekday = initWeekday;
  let arr = [];
  for (let i = 0; i < 7; i++) {
    let obj = { day: 0, weekday: 0 };
    if (startDay > daysInMonth) {
      startDay = 1;
      obj.day = startDay;
      startDay++;
    } else {
      obj.day = startDay;
      startDay++;
    }
    if (startWeekday > 7) {
      startWeekday = 1;
      obj.weekday = startWeekday;
      startWeekday++;
    } else {
      obj.weekday = startWeekday;
      startWeekday++;
    }
    arr.push(obj);
  }
  return arr;
};
