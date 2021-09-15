import { createContext, useState, useRef, useMemo, useEffect } from "react";

export const RemoveActiveContext = createContext(null);

export const createGroup = () => {
  const [active, setActive] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  // Set active state to the first element on the first render
  useEffect(() => {
    const firstChild = elementRef.current.querySelector(".option");
    firstChild && firstChild.classList.add("active");
    firstChild && setActive(firstChild.textContent);
  }, []);

  return useMemo(
    () => ({
      active,
      setActive,
      elementRef,
    }),
    [active, setActive, elementRef]
  );
};

// Get element bounding client rectangle
export const getElementRect = (element: HTMLElement): DOMRect => {
  const rect = element.getBoundingClientRect();
  return rect;
};

// TODO: Might add bounding client as an optional argument
export const animatedBackground = (
  event: any,
  element: any,
  width = element.offsetWidth,
  height = element.offsetHeight * 2,
  fromColor = "rgba(255,255,255,0.4)",
  toColor = "rgba(255,255,255,0)"
) => {
  // Get target's bounding client rect
  const { top, left } = getElementRect(element);

  // Get cusor position inside element
  const x: number = event.clientX - left;
  const y: number = event.clientY - top;

  // Change element background following cursor position
  element.style.background = `radial-gradient(
    ${width}px ${height}px 
    at ${x}px ${y}px,
    ${fromColor}, ${toColor})`;
};

const removeActiveSibling = (parentElement: HTMLElement) => {
  const currentActive = parentElement.querySelector(".option.active");
  currentActive.classList.remove("active");
};

export class OptionClass {
  elementRef: React.MutableRefObject<HTMLDivElement>;
  constructor(elementRef: React.MutableRefObject<HTMLDivElement>) {
    this.elementRef = elementRef;
  }

  defaultOnClick = (e: any) => {
    e.classList.add("active");
    // this.elementRef..classList.add("active");
    // const context = useOptionGroup();
    // if (context) {
    //   removeActiveSibling(context.optionListRef);
    // }
  };

  // Reset background on leave
  resetBackground = (e: any) => {
    if (!e.classList.contains("active")) {
      e.style.background = "black";
    } else e.style.background = "";
  };

  createOption = () => {
    useEffect(() => {
      const element = this.elementRef.current;
      element.addEventListener("click", (e) => this.defaultOnClick(e.target));
      element.addEventListener("mousemove", (e) => {
        if (e.target !== this.elementRef.current) {
          return;
        }
        animatedBackground(e, e.target);
      });
      element.addEventListener("mouseleave", (e) =>
        this.resetBackground(e.target)
      );
    });
  };
}
