import { forwardRef, createElement } from "react";
import classnames from "classnames";
import { tags } from "./tags";

export const tw = (tag) => (...args) =>
  forwardRef(({ as, ...props }, ref) => {
    const twClasses = typeof args[0] === "function" ? args[0](props) : args;
    const nonTransientProps = {};
    for (const [k, v] of Object.entries(props)) {
      if (k.startsWith("$")) continue;
      nonTransientProps[k] = v;
    }
    return createElement(as || tag, {
      ...nonTransientProps,
      ref,
      className: classnames(twClasses, props.className),
    });
  });

tags.forEach((tag) => {
  tw[tag] = tw(tag);
});

tw.classnames = classnames;
