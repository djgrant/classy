import { html } from "foldkit/html";
import { classy } from "../src/index.js";

type Message = { readonly _tag: "Clicked" };

const h = html<Message>();
const c = classy<Message>();

const Button = c.button("button");
Button([h.Disabled(true), h.OnClick({ _tag: "Clicked" })], ["Save"]);

const Status = c.div<{ $selected: boolean }>((props) => [
  "status",
  props.$selected && "selected",
]);
Status({ $selected: true })([h.Class("caller")], ["Ready"]);

const Input = c.input<{ $invalid: boolean }>((props) => [
  "input",
  props.$invalid && "invalid",
]);
Input({ $invalid: false })([h.Type("text")]);

// @ts-expect-error Void elements do not accept children.
Input({ $invalid: false })([], ["not valid"]);

// @ts-expect-error Variant props are required before attributes.
Status([], ["not valid"]);
