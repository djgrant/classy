# @djgrant/classy

Shared core for the `classy` component factories.

`@djgrant/classy` is the framework-agnostic package. Use one of the vendor packages to build components:

- `@djgrant/classy-react`
- `@djgrant/classy-solid`

## Install

```sh
npm install @djgrant/classy @djgrant/classy-react
```

Or for Solid:

```sh
npm install @djgrant/classy @djgrant/classy-solid
```

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

Version `2.0.0` turns `@djgrant/classy` into the shared core package.

- React users should move imports from `@djgrant/classy` to `@djgrant/classy-react`.
- Solid users should use `@djgrant/classy-solid`.

## Utilities

```ts
import { ifElse, switchCase } from "@djgrant/classy";

switchCase("lg", {
  sm: "text-sm",
  lg: "text-lg",
  default: "text-base",
});

ifElse(true, "font-bold", "font-normal");
```
