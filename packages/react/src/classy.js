import { createElement, forwardRef } from "react";
import isPropValid from "@emotion/is-prop-valid";
import {
  cn,
  createClassy,
  filterProps,
  getDisplayName,
  hoistStatics,
  resolveClassNames,
} from "@djgrant/classy";

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
