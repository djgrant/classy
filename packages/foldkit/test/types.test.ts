import { inertHtml, type HtmlBuilder } from "foldkit/html";
import { classy } from "../src/index.js";

type Message = { readonly _tag: "Clicked" };
type OtherMessage = { readonly _tag: "OtherClicked" };

declare const h: HtmlBuilder<Message>;
declare const hOther: HtmlBuilder<OtherMessage>;

const c = classy();

const Button = c.button("button");
Button([h.Disabled(true), h.OnClick({ _tag: "Clicked" })], ["Save"], h);

// Attributes from inertHtml carry Message `never`, so they flow into any builder's universe.
Button([inertHtml.Class("caller")], ["Save"], h);

const Status = c.div<{ $selected: boolean }>((props) => [
  "status",
  props.$selected && "selected",
]);
Status({ $selected: true })([h.Class("caller")], ["Ready"], h);

const Input = c.input<{ $invalid: boolean }>((props) => [
  "input",
  props.$invalid && "invalid",
]);
Input({ $invalid: false })([h.Type("text")], h);

// @ts-expect-error Message infers from the builder, so handlers pinned to another universe are rejected.
Button([h.OnClick({ _tag: "Clicked" })], ["Save"], hOther);

// @ts-expect-error Void elements do not accept children.
Input({ $invalid: false })([], ["not valid"], h);

// @ts-expect-error Variant props are required before attributes.
Status([], ["not valid"], h);
