import React, { ReactChild, ReactChildren } from "react";
import "./OptionGroup.scss";
import { createGroup, RemoveActiveContext } from "../../hooks/createOption";

const groupDirection: any = {
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

export interface OptionGroupProps {
  name?: string;
  direction?: string;
  children?: React.ReactNode;
}

const OptionGroup: React.FC<OptionGroupProps> = ({
  name,
  direction,
  children,
}) => {
  const direct = direction ? direction : "column";
  const value = createGroup();

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
          ref={value.elementRef}
        >
          {children}
        </div>
      </div>
    </RemoveActiveContext.Provider>
  );
};

export default OptionGroup;
