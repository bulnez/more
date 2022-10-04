import { useMemo } from "react";
import moment from "moment";

const useWeek = (weekOffset = 0) => {
  return useMemo(() => {
    const weekNum = moment().add(weekOffset, "isoWeeks").isoWeek();
    const weekStart = moment().add(weekOffset, "isoWeeks").startOf("isoWeeks");
    const weekEnd = moment().add(weekOffset, "isoWeeks").endOf("isoWeeks");
    const month = moment().add(weekOffset, "isoWeeks").month();
    const daysInMonth = weekStart.daysInMonth();
    const monthNameStart = weekStart.format("MMMM");
    const monthNameEnd = weekEnd.format("MMMM");
    const currYear = weekStart.year();

    let startDay = weekStart.date();
    const days = [];
    for (let i = 0; i < 7; i++) {
      if (startDay > daysInMonth) startDay = 1;
      days.push(startDay);
      startDay++;
    }

    return {
      year: currYear,
      month,
      daysInMonth,
      monthNameStart,
      monthNameEnd,
      week: weekNum,
      start: days[0],
      end: days[6],
      days,
    };
  }, [weekOffset]);
};

export default useWeek;
