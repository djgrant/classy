# @djgrant/classy-foldkit

Foldkit vendor package for `@djgrant/classy-core`. It creates reusable Foldkit element functions with static or variant-driven class names.

## Install

```sh
npm install @djgrant/classy-foldkit foldkit
```

## Usage

Create one Classy factory at module scope. Each element function takes the view's HTML builder `h` as its last argument, mirroring the `view(config, h)` convention in `@foldkit/ui`. `Message` infers from the builder, so a shared component used inside a Submodel is checked against that Submodel's own `Message` at the call site. A class function returns a props-curried element function. Variant props are used only to resolve classes and never become DOM attributes. The package also exports the shared `cn`, `ifElse`, and `switchCase` helpers:

```ts
import { classy, ifElse, switchCase } from "@djgrant/classy-foldkit";
import type { HtmlBuilder } from "foldkit/html";

type Message = { readonly _tag: "SaveClicked" };

const c = classy();

const Button = c.button<{ tone: "primary" | "danger" }>((props) => [
  "px-3 py-1.5 rounded-lg",
  switchCase(props.tone, {
    primary: "bg-gray-900 text-white",
    danger: "bg-red-600 text-white",
  }),
  ifElse(props.tone === "danger", "font-semibold"),
]);

export const view = (model: Model, h: HtmlBuilder<Message>) =>
  Button({ tone: "danger" })(
    [h.Disabled(false), h.OnClick({ _tag: "SaveClicked" })],
    ["Save"],
    h,
  );
```

Thread `h` through as an ordinary parameter, as Foldkit prescribes; never store it in module scope.

## Void elements

Foldkit void elements retain their attributes-only signature, followed by the builder:

```ts
const SearchInput = c.input("rounded border px-3 py-2");

SearchInput([h.Type("search"), h.Class("w-full")], h);
```

## Internals

Foldkit's renderer does not merge multiple `Class` attributes: the last one on an element replaces every earlier class value. A wrapper that merely prepended its base class would therefore lose that class whenever a caller supplied another `h.Class(...)`.

Classy partitions caller attributes, combines every caller `Class` value with the configured classes using `cn`, and emits one leading `Class` attribute. All non-class attributes remain in their original order, including `ChildAttribute` values spread from `@foldkit/ui` bundles:

```ts
const Card = c.div("rounded-lg bg-white");

Card(
  [...bundleAttributes, h.Class("ring-2 ring-sky-500"), h.Key("card")],
  ["Content"],
  h,
);
```

The result has one class value containing both `rounded-lg bg-white` and `ring-2 ring-sky-500`; the bundle attributes and `Key` pass through untouched.
