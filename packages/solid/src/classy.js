import { createClassy, cn, defineProxyProps, getDisplayName, hoistStatics, resolveClassNames } from "@djgrant/classy";
import { createComponent, Dynamic } from "solid-js/web";

export const classy = createClassy((tag, args) => {
  const component = (props) => {
    const forwardedProps = defineProxyProps(props, { exclude: ["as", "class"] });

    Object.defineProperty(forwardedProps, "class", {
      enumerable: true,
      get: () => cn(resolveClassNames(args, props), props.class),
    });

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
