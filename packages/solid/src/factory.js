import {
  createClassy,
  cn,
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
      const computeClassName = () =>
        cn(resolveClassNames(args, props), props.class);
      const excludedProps = new Set(["as", "class", "ref"]);
      const shouldForwardKey = (key) =>
        typeof key === "string" &&
        !excludedProps.has(key) &&
        !key.startsWith("$");
      const hasRef = "ref" in props;

      const createForwardedProps = (componentValue) => {
        const includeComponent = componentValue !== undefined;

        return new Proxy(props, {
          get(_, property) {
            if (property === "class") return computeClassName();
            if (property === "ref") return hasRef ? props.ref : undefined;
            if (includeComponent && property === "component") {
              return componentValue;
            }
            if (typeof property === "string") {
              if (shouldForwardKey(property)) {
                return props[property];
              }
              return undefined;
            }
            return props[property];
          },
          has(_, property) {
            if (property === "class") return true;
            if (property === "ref") return hasRef;
            if (includeComponent && property === "component") return true;
            if (typeof property === "string") {
              return shouldForwardKey(property) && property in props;
            }
            return property in props;
          },
          ownKeys(_) {
            const keys = Reflect.ownKeys(props).filter((key) => {
              if (typeof key === "string") {
                return shouldForwardKey(key);
              }
              return true;
            });

            if (!keys.includes("class")) keys.push("class");
            if (hasRef && !keys.includes("ref")) keys.push("ref");
            if (includeComponent && !keys.includes("component")) {
              keys.push("component");
            }

            return keys;
          },
          getOwnPropertyDescriptor(_, property) {
            if (property === "class") {
              return {
                enumerable: true,
                configurable: true,
                get: () => computeClassName(),
              };
            }

            if (property === "ref" && hasRef) {
              return {
                enumerable: true,
                configurable: true,
                get: () => props.ref,
              };
            }

            if (includeComponent && property === "component") {
              return {
                enumerable: true,
                configurable: true,
                get: () => componentValue,
              };
            }

            if (typeof property === "string" && shouldForwardKey(property)) {
              return {
                enumerable: true,
                configurable: true,
                get: () => props[property],
              };
            }

            return undefined;
          },
        });
      };

      const resolvedTag = props.as || tag;

      if (typeof resolvedTag === "string") {
        return renderIntrinsic(resolvedTag, createForwardedProps());
      }

      return createComponent(
        Dynamic,
        createForwardedProps(resolvedTag),
      );
    };

    const wrapped =
      typeof tag === "string" ? component : hoistStatics(component, tag);

    wrapped.displayName = `classy(${getDisplayName(tag)})`;

    return wrapped;
  });
}
