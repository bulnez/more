import moment from "moment";

const useWeek = (weekOffset = 0) => {
  const year = moment().year();
  const start = parseInt(
    moment().add(weekOffset, "isoWeeks").startOf("isoWeeks").format("DD")
  );
  const weekNum = moment().add(weekOffset, "isoWeeks").isoWeek();
  const d = moment().add(weekOffset, "isoWeeks").dayOfYear();
  const month =
    start > 25
      ? new Date(year, 0, d).getMonth()
      : new Date(year, 0, d).getMonth() + 1;
  const daysInMonth = moment(month, "MM").daysInMonth();
  let startDay = start;
  let days = [];
  for (let i = 0; i < 7; i++) {
    if (startDay > daysInMonth) {
      startDay = 1;
      days.push(startDay);
      startDay++;
    } else {
      days.push(startDay);
      startDay++;
    }
  }

  const monthNameStart = moment(month, "M").format("MMMM");
  const monthNameEnd =
    days[0] > daysInMonth - 6
      ? moment(month + 1, "M").format("MMMM")
      : moment(month, "M").format("MMMM");

  return {
    year,
    month,
    daysInMonth,
    monthNameStart,
    monthNameEnd,
    week: weekNum,
    start: days[0],
    end: days[6],
    days,
  };
};

export default useWeek;
