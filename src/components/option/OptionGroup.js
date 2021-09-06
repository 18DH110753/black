import React, { useMemo, useRef, useState } from "react";
import "./OptionGroup.scss";
// import { RemoveActiveContext } from "../../hooks/useRemoveActiveContext";
import {
  createOptionGroup,
  RemoveActiveContext,
} from "../../hooks/createOption";

const groupDirection = {
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100%, 1fr))",
  },
  column: {
    display: "inline-flex",
    flexDirection: "row",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
};

const OptionGroup = ({ name, direction, children }) => {
  const direct = direction ? direction : "column";
  const value = createOptionGroup();

  return (
    <RemoveActiveContext.Provider value={value}>
      <div className={"option-group"}>
        {name && (
          <div className={"option-name"}>
            <strong>{name}:</strong> {value.active}
          </div>
        )}
        <div
          className={"option-list"}
          style={groupDirection[direct]}
          ref={value.optionListRef}
        >
          {children}
        </div>
      </div>
    </RemoveActiveContext.Provider>
  );
};

export { OptionGroup };
