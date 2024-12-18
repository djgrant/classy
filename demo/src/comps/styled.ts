import { classy, ifElse, switchCase } from "@djgrant/classy";
import { Double as BaseDouble } from "./base";

export const Container = classy.div("m-auto max-w-72");

export const Heading = classy.h1<{ size: "lg" | "sm" }>((props) => [
  switchCase(props.size, {
    lg: "text-lg",
    sm: "text-sm",
    default: "text-md",
  }),
]);

export const Double = classy(BaseDouble)<{ alert?: true }>((props) => [
  "font-bold text-lg",
  ifElse(props.alert, "text-red-500"),
]);
