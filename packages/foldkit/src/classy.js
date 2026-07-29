import { html } from "foldkit/html";
import {
  cn,
  createClassy,
  resolveClassNames,
} from "../../core/src/index.js";

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

const mergeAttributes = (h, classNames, attributes) => {
  const callerClassNames = [];
  const otherAttributes = [];

  for (const attribute of attributes) {
    if (attribute?._tag === "Class") {
      callerClassNames.push(attribute.value);
    } else {
      otherAttributes.push(attribute);
    }
  }

  return [h.Class(cn(classNames, callerClassNames)), ...otherAttributes];
};

const elementFor = (h, tag, classNames) => {
  const element = h[tag];

  if (voidTags.has(tag)) {
    return (attributes) => element(mergeAttributes(h, classNames, attributes));
  }

  return (attributes, children) =>
    element(mergeAttributes(h, classNames, attributes), children);
};

export const classy = () => {
  const h = html();

  const factory = createClassy((tag, args) => {
    if (typeof args[0] === "function") {
      return (props) => elementFor(h, tag, resolveClassNames(args, props));
    }

    return elementFor(h, tag, resolveClassNames(args));
  });

  return new Proxy(factory, {
    get(target, property, receiver) {
      if (Reflect.has(target, property) || typeof property !== "string") {
        return Reflect.get(target, property, receiver);
      }

      const tagFactory = target(property);
      Object.defineProperty(target, property, { value: tagFactory });
      return tagFactory;
    },
  });
};
