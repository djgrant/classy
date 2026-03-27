# @djgrant/classy-solid

Solid vendor package for `@djgrant/classy-core`.

The published package is plain JS and works in SSR without requiring consumers
to run the Solid JSX transform on files inside `node_modules`.

```tsx
import { classy, switchCase } from "@djgrant/classy-solid";

const Button = classy.button<{ $size: "sm" | "lg" }>((props) => [
  "font-semibold",
  switchCase(props.$size, {
    sm: "text-sm",
    lg: "text-lg",
  }),
]);
```
