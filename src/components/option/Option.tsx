import React, { useContext, useRef } from "react";
import "./Option.scss";
import {
  // resetBackground,
  // defaultOnClick,
  useCreateOption,
} from "../../hooks/createOption";
// import { RemoveActiveContext } from "../../hooks/useRemoveActiveContext";

export interface OptionProps {
  children: React.ReactNode;
  optionalFunction?: Function;
}

const Option: React.FC<OptionProps> = ({ children, optionalFunction }) => {
  // TODO: This should behave like group
  const optionRef = useRef<HTMLDivElement>(null);
  const newOption = useCreateOption(optionRef);

  return (
    <div className={"option-container"}>
      <div
        className={"option"}
        ref={optionRef}
        onClick={() => {
          Boolean(optionalFunction) ? optionalFunction() : ""; // Should be checked by default
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Option;
