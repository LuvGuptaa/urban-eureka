import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "../styles/EventModal.css";
import drag from "../assets/drag.png";
import cross from "../assets/cross.png";
import deleteBtn from "../assets/delete.png";
import time from "../assets/time.png";
import text from "../assets/text.png";
import bookmark from "../assets/bookmark.png";
import tick from "../assets/tick.png";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="event" onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowEventModal(false)
      }
    }}>
      <form>
        <header>
          <img src={drag} alt="" style={{ height: "20px", width: "20px", cursor: 'grab' }} />
          <div>
            {selectedEvent && (
              <img
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                src={deleteBtn}
                alt=""
                style={{ height: "20px", width: "20px", marginRight: '.5rem', cursor: 'pointer' }}
              />
            )}
            <button onClick={() => setShowEventModal(false)}>
              <img
                src={cross}
                alt=""
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </header>
        <div className="event-wrapper">
          <div className="event-container">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="event-title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <img src={time} alt="" style={{ height: "20px", width: "20px" }} />
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <img src={text} alt="" style={{ height: "20px", width: "20px" }} />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="event-title"
              onChange={(e) => setDescription(e.target.value)}
            />
            <img
              src={bookmark}
              alt=""
              style={{ height: "20px", width: "20px" }}
            />
            <div className="color-picker">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass} item-color`}
                >
                  {selectedLabel === lblClass && (
                    <img
                      src={tick}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
