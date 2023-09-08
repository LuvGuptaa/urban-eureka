import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils";
import left from "../assets/left.svg"
import right from "../assets/right.svg"

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "current-day";
    } else if (currDay === slcDay) {
      return "selected-day";
    } else {
      return "";
    }
  }
  return (
    <div className="mini-calendar">
      <header className="mini-header">
        <p className="mini-month">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button className="change-month" onClick={handlePrevMonth}>
            <img src={left} alt="" style={{ height: "15px", width: "15px" }} />
          </button>
          <button className="change-month" onClick={handleNextMonth}>
            <img src={right} alt="" style={{ height: "15px", width: "15px" }} />
          </button>
        </div>
      </header>
      <div className="mini-calendar-grid">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="mini-calendar-days">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`mini-calendar-dates ${getDayClass(day)}`}
              >
                <span>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
