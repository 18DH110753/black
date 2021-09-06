import React, { useContext, useRef } from "react";
import "./Option.scss";
import {
  animatedBackground,
  resetBackground,
  defaultOnClick,
  RemoveActiveContext,
  useOptionGroup,
} from "../../hooks/createOption";
// import { RemoveActiveContext } from "../../hooks/useRemoveActiveContext";

const Option = ({ children, optionalFunction }) => {
  // TODO: Do I need this for all option or just for some option
  const context = useContext(RemoveActiveContext);
  // console.log(context);

  if (!context) {
    throw Error("Option component need to be wrapped in an OptionGroup");
  }

  const { setActive, optionListRef } = context;
  // const { optionListRef } = useOptionGroup();

  const optionRef = useRef();

  return (
    <div className={"option-container"}>
      <div
        className={"option"}
        ref={optionRef}
        onClick={() => {
          defaultOnClick(optionRef.current);
          Boolean(optionalFunction) ? optionalFunction() : "";
          setActive(optionRef.current.textContent);
        }}
        onMouseMove={(e) => {
          animatedBackground(e, optionRef.current);
          animatedBackground(
            e,
            optionListRef.current, // element to animated background
            optionRef.current.offsetWidth,
            optionRef.current.offsetHeight
          );
        }}
        onMouseLeave={() => resetBackground(optionRef.current)}
      >
        {children}
      </div>
    </div>
  );
};

export { Option };
