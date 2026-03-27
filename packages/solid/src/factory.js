import {
  createClassy,
  cn,
  defineProxyProps,
  getDisplayName,
  hoistStatics,
  resolveClassNames,
} from "@djgrant/classy-core";
import { createComponent, Dynamic } from "solid-js/web";

/**
 * Creates a classy instance with a pluggable strategy for rendering
 * string tags. The `renderIntrinsic` function receives (tag, props)
 * and returns a rendered element.
 */
export function createClassySolid(renderIntrinsic) {
  return createClassy((tag, args) => {
    const component = (props) => {
      const forwardedProps = defineProxyProps(props, {
        exclude: ["as", "class"],
      });

      Object.defineProperty(forwardedProps, "class", {
        enumerable: true,
        get: () => cn(resolveClassNames(args, props), props.class),
      });

      const resolvedTag = props.as || tag;

      if (typeof resolvedTag === "string") {
        return renderIntrinsic(resolvedTag, forwardedProps);
      }

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
}
