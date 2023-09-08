import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="create-event"
    >
      <img src={plusImg} alt="create_event" style={{height: '1.75rem', width: '1.75rem'}} />
      <span> Create</span>
    </button>
  );
}
