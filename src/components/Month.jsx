import React from "react";
import Day from "./Day";
import "../styles/Month.css"
export default function Month({ month, user }) {
  return (
    <div className="month">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} user={user} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}