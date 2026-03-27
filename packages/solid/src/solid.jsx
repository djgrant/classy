import {
  createClassy,
  cn,
  defineProxyProps,
  getDisplayName,
  hoistStatics,
  resolveClassNames,
} from "@djgrant/classy-core";
import { createComponent, Dynamic } from "solid-js/web";
import { intrinsics } from "./intrinsics.jsx";

export const classy = createClassy((tag, args) => {
  const component = (props) => {
    const forwardedProps = defineProxyProps(props, { exclude: ["as", "class"] });

    Object.defineProperty(forwardedProps, "class", {
      enumerable: true,
      get: () => cn(resolveClassNames(args, props), props.class),
    });

    const resolvedTag = props.as || tag;

    // When the resolved tag is a string and we have a static JSX component
    // for it, use that directly. This lets the Solid compiler produce a
    // static template — critical for SSR hydration to work correctly.
    if (typeof resolvedTag === "string" && intrinsics[resolvedTag]) {
      return createComponent(intrinsics[resolvedTag], forwardedProps);
    }

    // Custom component or unknown tag — fall back to Dynamic
    Object.defineProperty(forwardedProps, "component", {
      enumerable: true,
      get: () => resolvedTag,
    });

    return createComponent(Dynamic, forwardedProps);
  };

  const wrapped =
    typeof tag === "string" ? component : hoistStatics(component, tag);

  wrapped.displayName = `classy(${getDisplayName(tag)})`;

  return wrapped;
});
