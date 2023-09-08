import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import '../styles/Sidebar.css'
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}