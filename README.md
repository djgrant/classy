# react-tailwind

Build React components using [tailwindcss][tw] and a [styled-components][sc] like API.

```js
import { tw, switchcase } from "@djgrant/react-tailwind";

const Button = styled.button((props) => [
  "font-semibold",
  "rounded",
  switchcase(size, {
    lg: ["text-base", "py-3", "px-4"],
    sm: ["text-xs", "py-1", "px-2"],
    default: ["text-sm", "py-2", "px-3"],
  }),
]);
```

## Install

```sh
npm install @djgrant/react-tailwind
```

[tw]: https://tailwindcss.com
