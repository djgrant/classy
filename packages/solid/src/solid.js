import {
  createClassy,
  cn,
  defineProxyProps,
  getDisplayName,
  hoistStatics,
  resolveClassNames,
} from "@djgrant/classy-core";
import { createComponent, createDynamic, Dynamic } from "solid-js/web";

export * from "@djgrant/classy-core";

export const classy = createClassy((tag, args) => {
  const component = (props) => {
    const forwardedProps = defineProxyProps(props, { exclude: ["as", "class"] });

    Object.defineProperty(forwardedProps, "class", {
      enumerable: true,
      get: () => cn(resolveClassNames(args, props), props.class),
    });

    // For string tags, use createDynamic directly to avoid an extra component
    // boundary that breaks SSR hydration. createDynamic is the lower-level
    // primitive that Dynamic wraps — it renders inline without a boundary.
    if (typeof tag === "string") {
      return createDynamic(() => props.as || tag, forwardedProps);
    }

    Object.defineProperty(forwardedProps, "component", {
      enumerable: true,
      get: () => props.as || tag,
    });

    return createComponent(Dynamic, forwardedProps);
  };

  const wrapped =
    typeof tag === "string" ? component : hoistStatics(component, tag);

  wrapped.displayName = `classy(${getDisplayName(tag)})`;

  return wrapped;
});
