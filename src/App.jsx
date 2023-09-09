import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./utils";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import HolidayEvent from "./HolidayEvent";
function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

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
          <Month month={currenMonth}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
