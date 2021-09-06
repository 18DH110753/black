import {
  useLayoutEffect,
  createContext,
  useState,
  useRef,
  useMemo,
} from "react";

export const RemoveActiveContext = createContext(null);

export const createOptionGroup = (args) => {
  const [active, setActive] = useState();
  const optionListRef = useRef();
  // Set active state to the first element on the first render
  useLayoutEffect(() => {
    const firstChild = optionListRef.current.querySelector(".option");
    firstChild && firstChild.classList.add("active");
    firstChild && setActive(firstChild.textContent);
  }, []);

  return useMemo(
    () => ({
      active,
      setActive,
      optionListRef,
    }),
    [active, setActive, optionListRef]
  );
};

// Get element bounding client rectangle
export const getElementRect = (element) => {
  const rect = element.getBoundingClientRect();
  return rect;
};

// TODO: Might add bounding client as an optional argument
export const animatedBackground = (
  event,
  target,
  width = target.offsetWidth,
  height = target.offsetHeight * 2,
  fromColor = "rgba(255,255,255,0.4)",
  toColor = "rgba(255,255,255,0)"
) => {
  // Get target's bounding client rect
  const { top, left } = getElementRect(target);

  // Get cusor position inside element
  const x = event.clientX - left;
  const y = event.clientY - top;

  // Change element background following cursor position
  target.style.background = `radial-gradient(
    ${width}px ${height}px 
    at ${x}px ${y}px,
    ${fromColor}, ${toColor})`;
};

const removeActiveSibling = (parentElement) => {
  const currentActive = parentElement.querySelector(".option.active");
  currentActive.classList.remove("active");
};

export const defaultOnClick = (element) => {
  element.classList.add("active");
  // const context = useOptionGroup();
  // if (context) {
  //   removeActiveSibling(context.optionListRef);
  // }
};

// Reset background on leave
// TODO: Split element and parent function
export const resetBackground = (element, parentElement) => {
  if (parentElement) {
    parentElement.style.background = "black";
  }

  if (!element.classList.contains("active")) {
    element.style.background = "black";
  } else element.style.background = "";
};
