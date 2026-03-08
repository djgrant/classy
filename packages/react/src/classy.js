import { createElement, forwardRef } from "react";
import {
  cn,
  createClassy,
  filterProps,
  getDisplayName,
  hoistStatics,
  resolveClassNames,
} from "../../../src/index.js";
import { isPropValid } from "./is-prop-valid.js";

const shouldForwardIntrinsicProp = (tag, propName) => {
  if (typeof tag !== "string" || tag.includes("-")) return true;
  if (propName === "children") return true;
  return isPropValid(propName);
};

export const classy = createClassy((tag, args) => {
  const component = forwardRef(({ as, ...props }, ref) => {
    const renderedTag = as || tag;
    const classNames = resolveClassNames(args, props);
    const forwardedProps = filterProps(props, {
      shouldForwardProp: (key) => shouldForwardIntrinsicProp(renderedTag, key),
    });

    return createElement(renderedTag, {
      ...forwardedProps,
      ref,
      className: cn(classNames, props.className),
    });
  });

  const wrapped =
    typeof tag === "string" ? component : hoistStatics(component, tag);

  wrapped.displayName = `classy(${getDisplayName(tag)})`;

  return wrapped;
});
