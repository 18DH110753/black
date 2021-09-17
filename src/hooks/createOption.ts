import React, {
  createContext,
  useState,
  useRef,
  useMemo,
  useEffect,
  useContext,
} from "react";

export const RemoveActiveContext = createContext(null);

// TODO: Wrap this inside a class

// Group class provide a reference which can be used to initialized new group
class Group {
  init = () => {
    const [active, setActive] = useState("");
    const elementRef = useRef<HTMLDivElement>(null);

    // Set active state to the first element on the first render
    useEffect(() => {
      const firstChild = elementRef.current.querySelector(".option");
      firstChild && firstChild.classList.add("active");
      firstChild && setActive(firstChild.textContent);
    }, []);

    // Return value that will be pass to children using context hook
    return useMemo(
      () => ({
        active,
        setActive,
        elementRef,
      }),
      [active, setActive, elementRef]
    );
  };
}

// TODO: Might return a wraper component instead?
// Create a new instance of group
export const createGroup = () => {
  const instance = new Group();
  return instance.init();
};

class OptionClass {
  elementRef: React.MutableRefObject<HTMLDivElement>;
  context: any;

  constructor(elementRef: React.MutableRefObject<HTMLDivElement>) {
    this.elementRef = elementRef;
  }
  // Get element bounding client rectangle
  getElementRect = (element: HTMLElement): DOMRect => {
    const rect = element.getBoundingClientRect();
    return rect;
  };

  // TODO: Might add bounding client as an optional argument
  // TODO: Move this to where?
  animatedBackground = (
    event: any,
    element: any,
    width = element.offsetWidth,
    height = element.offsetHeight * 2,
    fromColor = "rgba(255,255,255,0.4)",
    toColor = "rgba(255,255,255,0)"
  ) => {
    // Get target's bounding client rect
    const { top, left } = this.getElementRect(element);

    // Get cusor position inside element
    const x: number = event.clientX - left;
    const y: number = event.clientY - top;

    // Change element background following cursor position
    element.style.background = `radial-gradient(
    ${width}px ${height}px 
    at ${x}px ${y}px,
    ${fromColor}, ${toColor})`;
  };

  removeActiveSibling = (group: HTMLDivElement) => {
    const currentActive = group.querySelector(".option.active");
    currentActive.classList.remove("active");
  };

  defaultOnClick = (e: any) => {
    e.classList.add("active");
  };

  // Reset background on leave
  resetBackground = (e: any) => {
    if (!e.classList.contains("active")) {
      e.style.background = "black";
    } else e.style.background = "";
  };

  init = () => {
    // Get value that being passed in by context hook from group
    this.context = useContext(RemoveActiveContext);

    useEffect(() => {
      const element = this.elementRef.current;

      // Check if this option is being warpped by a group
      // If so add removeActiveSibling event as a default behavior
      if (this.context) {
        element.addEventListener("click", (e) => {
          this.removeActiveSibling(this.context.elementRef.current);
          this.defaultOnClick(e.target);
        });

        // Remove background on mouse leave
        element.addEventListener("mouseleave", (e) =>
          this.resetBackground(this.context.elementRef.current)
        );
        element.addEventListener("mousemove", (e) => {
          this.animatedBackground(
            e,
            this.context.elementRef.current,
            element.offsetWidth,
            element.offsetHeight
          );
        });
      } else {
        element.addEventListener("click", (e) => this.defaultOnClick(e.target));
        // Remove background on mouse leave
      }

      // Animate background on mouse move
      element.addEventListener("mousemove", (e) => {
        if (e.target !== this.elementRef.current) {
          return;
        }
        this.animatedBackground(e, e.target);
      });

      element.addEventListener("mouseleave", (e) =>
        this.resetBackground(e.target)
      );
    });
  };
}

// Create new option hoook
export const useCreateOption = (
  optionRef: React.MutableRefObject<HTMLDivElement>
) => {
  const instance = new OptionClass(optionRef);
  instance.init();
  return {
    click: instance.defaultOnClick,
    getElementRect: instance.getElementRect,
    animatedBackground: instance.animatedBackground,
    resetBackground: instance.resetBackground,

    // TODO: Should I move this to a difference hook?
    context: instance.context,
  };
};
