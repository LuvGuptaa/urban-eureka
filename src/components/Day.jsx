import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    holidays,
  } = useContext(GlobalContext);
  

  useEffect(() => {
    const filteredDayEvents = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    const holidayEvents = holidays.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    const allDayEvents = [...filteredDayEvents, ...holidayEvents];

    setDayEvents(allDayEvents);
  }, [filteredEvents, holidays, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current-day main-current-day"
      : "";
  }
  return (
    <>
      <div className="cell">
        <header>
          {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
          <p className={`${getCurrentDayClass()}`}>{day.format("D")}</p>
        </header>
        <div
          className="task-container"
          onClick={() => {
            setDaySelected(day);
            setShowEventModal(true);
          }}
        >
          {dayEvents.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`bg-${evt.label} task`}
            >
              {evt.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
