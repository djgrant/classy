import { createDynamic } from "solid-js/web";
import { createClassySolid } from "./factory.js";

export const classy = createClassySolid((tag, props) =>
  createDynamic(() => tag, props),
);
