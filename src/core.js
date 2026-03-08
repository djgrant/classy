import clsx from "clsx";
import { tags } from "./tags.js";

const RESERVED_STATICS = new Set([
  "arguments",
  "caller",
  "length",
  "name",
  "prototype",
  "$$typeof",
  "render",
]);

export const cn = clsx;

export const createClassy = (renderComponent) => {
  const classy = (tag) => (...args) => renderComponent(tag, args);

  for (const tag of tags) {
    classy[tag] = classy(tag);
  }

  classy.string = clsx;

  return classy;
};

export const resolveClassNames = (args, props) =>
  typeof args[0] === "function" ? args[0](props) : args;

export const filterProps = (
  props,
  { exclude = [], shouldForwardProp = () => true } = {},
) => {
  const excludedProps = new Set(exclude);
  const forwardedProps = {};

  for (const [key, value] of Object.entries(props)) {
    if (excludedProps.has(key) || key.startsWith("$")) continue;
    if (!shouldForwardProp(key, value)) continue;
    forwardedProps[key] = value;
  }

  return forwardedProps;
};

export const defineProxyProps = (
  props,
  { exclude = [], shouldForwardProp = () => true } = {},
) => {
  const excludedProps = new Set(exclude);
  const forwardedProps = {};

  for (const key of Object.keys(props)) {
    if (excludedProps.has(key) || key.startsWith("$")) continue;
    if (!shouldForwardProp(key, props[key])) continue;

    Object.defineProperty(forwardedProps, key, {
      enumerable: true,
      get: () => props[key],
    });
  }

  return forwardedProps;
};

export const getDisplayName = (tag) =>
  typeof tag === "string" ? tag : tag.displayName || tag.name || "Component";

export const hoistStatics = (target, source) => {
  if (!source || (typeof source !== "function" && typeof source !== "object")) {
    return target;
  }

  for (const key of Reflect.ownKeys(source)) {
    if (RESERVED_STATICS.has(key)) continue;

    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (!descriptor) continue;

    Object.defineProperty(target, key, descriptor);
  }

  return target;
};
