import { createComponent } from "solid-js/web";
import { createClassySolid } from "./factory.js";
import { intrinsics } from "./intrinsics.jsx";

export const classy = createClassySolid((tag, props) => {
  const TagComponent = intrinsics[tag];
  if (TagComponent) {
    return createComponent(TagComponent, props);
  }
  // Unknown tag (shouldn't happen for standard HTML/SVG) — fall through
  const el = document.createElement(tag);
  return el;
});
