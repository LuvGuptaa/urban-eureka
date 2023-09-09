import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./utils";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import HolidayEvent from "./HolidayEvent";

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCyZKBLUwE-5lJBj8aLhVqZnniAXlJwaJE",
    authDomain: "chronoview-7a39a.firebaseapp.com",
    projectId: "chronoview-7a39a",
    storageBucket: "chronoview-7a39a.appspot.com",
    messagingSenderId: "655782600676",
    appId: "1:655782600676:web:1474d9a01940d0563b31f1",
    measurementId: "G-Y2DQX1P6CW",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // console.log(db);

  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  // const messagesRef = firestore.collection("tasks");
  // const query = messagesRef.orderBy("createdAt").limit(25);

  // const [messages] = useCollectionData(query, { idField: "id" });

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <HolidayEvent />
      {showEventModal && <EventModal />}

      <div className="App">
        <CalendarHeader />
        <div className="container">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
