import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import "../styles/CalendarHeader.css"
import left from "../assets/left.svg"
import right from "../assets/right.svg"

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="header">
      <img src={logo} alt="calendar" className="logo" />
      <h1>
        Calendar
      </h1>
      <button
        onClick={handleReset}
        className="reset-btn"
      >
        Today
      </button>
      <button className="change-month" onClick={handlePrevMonth}>
        <img src={left} alt="" style={{height: '15px', width: '15px'}}/>
      </button>
      <button className="change-month" onClick={handleNextMonth}>
        <img src={right} alt="" style={{height: '15px', width: '15px'}}/>
      </button>
      <h2 className="current-month">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}