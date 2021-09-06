import React, { useRef } from "react";
import { animatedBackground, resetBackground } from "../../hooks/createOption";

const Card = ({ title, children, footer }) => {
  const optionRef = useRef();

  return (
    <div
      className={"card option"}
      ref={optionRef}
      onMouseMove={(e) => animatedBackground(e, optionRef.current)}
      onMouseLeave={() => resetBackground(optionRef.current)}
    >
      <div className={"title"}>{title}</div>
      <div className={"body"}>{children}</div>
      <div className={"footer"}>{footer}</div>
    </div>
  );
};

export default Card;
