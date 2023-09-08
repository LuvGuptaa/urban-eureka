import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="label">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="label-items">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`accent-${lbl} label-checkbox`}
          />
          <span className="label-title">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}