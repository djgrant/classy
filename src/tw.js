import React from "react";
import { classnames } from "tailwindcss-classnames";
import { tags } from "./tags";

export const tw = (tag) => (...args) => ({ as, ...props }) => {
  const twClasses = typeof args[0] === "function" ? args[0](props) : args;
  return React.createElement(as || tag, {
    ...props,
    className: classnames(twClasses, props.className),
  });
};

tags.forEach((tag) => {
  tw[tag] = tw(tag);
});

tw.classnames = classnames;
