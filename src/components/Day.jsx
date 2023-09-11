import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";


export default function Day({ day, rowIdx, user }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCyZKBLUwE-5lJBj8aLhVqZnniAXlJwaJE",

    authDomain: "chronoview-7a39a.firebaseapp.com",

    databaseURL: "https://chronoview-7a39a-default-rtdb.firebaseio.com",

    projectId: "chronoview-7a39a",

    storageBucket: "chronoview-7a39a.appspot.com",

    messagingSenderId: "655782600676",

    appId: "1:655782600676:web:1474d9a01940d0563b31f1",

    measurementId: "G-Y2DQX1P6CW",
  };
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  const [dayEvents, setDayEvents] = useState([]);
  const [data, setData] = useState(null)
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    holidays,
  } = useContext(GlobalContext);

  useEffect(() => {
    const tasksRef = ref(db, "tasks" + user.uid);

    const fetchData = async () => {
      try {
        const snapshot = await get(tasksRef);

        if (snapshot.exists()) {
          
          const data = snapshot.val();
          setData(data); 
        } else {
          console.log("No data available at the specified reference.");
        }
      } catch (error) {
        console.error("Error reading data: ", error);
      }
    };

    fetchData(); 
  }, [])
  

  useEffect(() => {
    
    const filteredDayEvents = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );

    const holidayEvents = holidays.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    if (data !== null) {
      const dataEvents = data.filter(
        (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
      );
      const allDayEvents = [...filteredDayEvents, ...holidayEvents, ...dataEvents];
      setDayEvents(allDayEvents)
    }
    else {
      const allDayEvents = [...filteredDayEvents, ...holidayEvents];
      setDayEvents(allDayEvents)
    }
    
  }, [filteredEvents, holidays, day, data]);

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
