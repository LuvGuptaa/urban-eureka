import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import "../styles/CalendarHeader.css";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
// import { collection, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

export default function CalendarHeader({ db, user, handleSignOut }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const tasks = JSON.parse(localStorage.getItem("savedEvents"));
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
  const handleSubmit = async (e) => {
    const tasksRef = ref(db, "tasks"+ user.uid );
    e.preventDefault();
    // console.log(tasks);

    try {
      await set(tasksRef, tasks);

      console.log("Data written successfully");
    } catch (error) {
      console.error("Error writing data: ", error);
    }
  };
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="calendar" className="logo" />
        <h1>Calendar</h1>
        <button onClick={handleReset} className="reset-btn">
          Today
        </button>
        <button className="change-month" onClick={handlePrevMonth}>
          <img src={left} alt="" style={{ height: "15px", width: "15px" }} />
        </button>
        <button className="change-month" onClick={handleNextMonth}>
          <img src={right} alt="" style={{ height: "15px", width: "15px" }} />
        </button>
        <h2 className="current-month">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="header-right">
        <button type="submit" onClick={handleSubmit}>
          Save on Cloud
        </button>
        <button type="submit" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
