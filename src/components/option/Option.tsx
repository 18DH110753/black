import React, { ReactChild, ReactChildren, useContext, useRef } from "react";
import "./Option.scss";
import {
  animatedBackground,
  // resetBackground,
  // defaultOnClick,
  RemoveActiveContext,
  OptionClass,
} from "../../hooks/createOption";
// import { RemoveActiveContext } from "../../hooks/useRemoveActiveContext";

export interface OptionProps {
  children: React.ReactNode;
  optionalFunction?: Function;
}

const Option: React.FC<OptionProps> = ({ children, optionalFunction }) => {
  // TODO: Do I need this for all option or just for some option
  const context = useContext(RemoveActiveContext);

  if (!context) {
    throw Error("Option component need to be wrapped in an OptionGroup");
  }

  const { setActive, elementRef } = context;

  const optionRef = useRef<HTMLDivElement>(null);
  const newOption = new OptionClass(optionRef);
  newOption.createOption();

  return (
    <div className={"option-container"}>
      <div
        className={"option"}
        ref={optionRef}
        onClick={() => {
          Boolean(optionalFunction) ? optionalFunction() : ""; // Should be checked by default
          setActive(optionRef.current.textContent); // Does this really need?
        }}
        onMouseMove={(e) => {
          // animatedBackground(e, optionRef.current); // => Remove this as this is default behavior, provide hook to stop default behavior?
          animatedBackground(
            e,
            elementRef.current, // element to animated background
            optionRef.current.offsetWidth,
            optionRef.current.offsetHeight
          );
        }}
        onMouseLeave={() => newOption.resetBackground(elementRef.current)}
      >
        {children}
      </div>
    </div>
  );
};

export default Option;
