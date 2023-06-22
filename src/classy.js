import { forwardRef, createElement } from "react";
import clsx from "clsx";
import { tags } from "./tags.js";

export const classy =
  (tag) =>
  (...args) =>
    forwardRef(({ as, ...props }, ref) => {
      const classNames = typeof args[0] === "function" ? args[0](props) : args;
      const nonTransientProps = {};
      for (const [k, v] of Object.entries(props)) {
        if (k.startsWith("$")) continue;
        nonTransientProps[k] = v;
      }
      return createElement(as || tag, {
        ...nonTransientProps,
        ref,
        className: clsx(classNames, props.className),
      });
    });

tags.forEach((tag) => {
  classy[tag] = classy(tag);
});

classy.string = clsx;
