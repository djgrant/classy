# @djgrant/classy-react

React vendor package for `@djgrant/classy-core`.

```tsx
import { classy, switchCase } from "@djgrant/classy-react";

const Button = classy.button<{ $size: "sm" | "lg" }>((props) => [
  "font-semibold",
  switchCase(props.$size, {
    sm: "text-sm",
    lg: "text-lg",
  }),
]);
```
