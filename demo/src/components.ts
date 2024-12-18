import { classy, ifElse } from "../../src";

export const Heading = classy.h1<{ a: boolean }>((props) => [
  "big",
  ifElse(props.a, "small"),
]);
