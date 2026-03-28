import { createComponent, Dynamic } from "solid-js/web";
import { createClassySolid } from "./factory.js";

export const classy = createClassySolid((tag, props) => {
  Object.defineProperty(props, "component", {
    enumerable: true,
    get: () => tag,
  });

  return createComponent(Dynamic, props);
});
