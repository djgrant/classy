# @djgrant/classy-core

Shared core for the `classy` component factories.

`@djgrant/classy-core` is the framework-agnostic package. Use one of the vendor packages to build components:

- `@djgrant/classy-react`
- `@djgrant/classy-solid`

## Install

```sh
npm install @djgrant/classy-react
```

Or for Solid:

```sh
npm install @djgrant/classy-solid
```

The vendor packages bundle the shared core, so app code does not need to install `@djgrant/classy-core` separately unless you want the low-level helpers directly.

## Core API

The core package exports:

- `cn`
- `createClassy`
- `defineProxyProps`
- `filterProps`
- `getDisplayName`
- `hoistStatics`
- `ifElse`
- `resolveClassNames`
- `switchCase`
- `tags`

## Migration

Version `1.0.0` establishes `@djgrant/classy-core` as the shared core package.

- React users should move core imports from `@djgrant/classy-core` to `@djgrant/classy-react` for framework bindings.
- Solid users should use `@djgrant/classy-solid`.

## API Parity

| Concept | React | Solid |
| --- | --- | --- |
| Package | `@djgrant/classy-react` | `@djgrant/classy-solid` |
| Main factory | `classy.div(...)` | `classy.div(...)` |
| Component wrapping | `classy(Button)(...)` | `classy(Button)(...)` |
| Variant helpers | `switchCase`, `ifElse`, `cn` | `switchCase`, `ifElse`, `cn` |
| Styling-only props | `$tone`, `$size`, etc. | `$tone`, `$size`, etc. |
| Polymorphism | `as` | `as` |
| Class prop | `className` | `class` |
| Wrapper type | `forwardRef` component | Solid component using `Dynamic` |
| Intrinsic prop filtering | strips invalid DOM props | strips transient props and forwards the rest |

## Utilities

```ts
import { ifElse, switchCase } from "@djgrant/classy-core";

switchCase("lg", {
  sm: "text-sm",
  lg: "text-lg",
  default: "text-base",
});

ifElse(true, "font-bold", "font-normal");
```
