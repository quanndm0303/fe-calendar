import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";

const MiniCalendar = ({ currentDate, setCurrentDate }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-header">
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="mini-calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="mini-calendar-weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="mini-calendar-days">
        {monthDays.map((day) => (
          <div
            key={day.toString()}
            className={`mini-calendar-day ${
              !isSameMonth(day, monthStart)
                ? "other-month"
                : isSameDay(day, new Date())
                ? "today"
                : ""
            }`}
            onClick={() => setCurrentDate(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
