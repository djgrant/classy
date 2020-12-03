import { forwardRef, createElement } from "react";
import { classnames } from "tailwindcss-classnames";
import { tags } from "./tags";

export const tw = (tag) => (...args) =>
  forwardRef(({ as, ...props }, ref) => {
    const twClasses = typeof args[0] === "function" ? args[0](props) : args;
    return createElement(as || tag, {
      ...props,
      ref,
      className: classnames(twClasses, props.className),
    });
  });

tags.forEach((tag) => {
  tw[tag] = tw(tag);
});

tw.classnames = classnames;
