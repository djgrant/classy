# @djgrant/classy

Create fully-typed React components with CSS classes (e.g. [tailwindcss][tw]).

- Tames long className strings
- Produces extensible components
- Handles prop interpolations and transient props
- Backwards compatible with [clsx][clsx] (only dependency)
- Small and fast

## Getting Started

```sh
npm install @djgrant/classy
```

```tsx
import { classy, switchCase } from "@djgrant/classy";

type ButtonProps = { size: "sm" | "md" | "lg" };

const Button = classy.button<ButtonProps>((props) => ([
  "font-semibold",
  "rounded",
  switchCase(props.size, {
    lg: ["text-base", "py-3", "px-4"],
    sm: ["text-xs", "py-1", "px-2"],
    default: ["text-sm", "py-2", "px-3"],
  }),
]);

<Button size="lg">Submit</Button>;
```

## Examples

### Input Parameters

### Prop Switching

### Custom Components

### Extending Components

### Generating className Strings

### Declaring Transient Props

## Tailwind Support

To get tailwind completions, install the [tailwind extension][twex], and add to `.vscode/settings.json`:

```json
{
  "editor.quickSuggestions": {
    "strings": true // forces VS Code to trigger completions when editing "string" content
  },
  "tailwindCSS.experimental.classRegex": [
    ["classy\\..+\\(([^)]*)\\)", "\"([^\"]*)\""] // classy.div(...)
  ]
}
```

## Credits

Created by Daniel Grant ([@djgrant\_][djg]).

Inspired by [styled-components][sc] and [classnames][cn].

[tw]: https://tailwindcss.com
[twex]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[sc]: https://styled-components.com
[cn]: https://www.npmjs.com/package/classnames
[clsx]: https://github.com/lukeed/clsx
[djg]: https://twitter.com/djgrant_
