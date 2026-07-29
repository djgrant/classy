# @djgrant/classy-foldkit

Foldkit vendor package for `@djgrant/classy-core`. It creates reusable Foldkit
element functions with static or variant-driven class names.

## Install

```sh
npm install @djgrant/classy-foldkit foldkit
```

## Static classes

Create one Classy factory for the application's `Message` type, mirroring the
Foldkit HTML factory. Static classes return an element function directly:

```ts
import { classy } from "@djgrant/classy-foldkit";
import { html } from "foldkit/html";

type Message = { readonly _tag: "SaveClicked" };

const h = html<Message>();
const c = classy<Message>();

const SaveButton = c.button(
  "px-3 py-1.5 rounded-lg bg-gray-900 text-white",
);

SaveButton(
  [h.Disabled(false), h.OnClick({ _tag: "SaveClicked" })],
  ["Save"],
);
```

## Variants

A class function returns a props-curried element function. Variant props are
used only to resolve classes and never become DOM attributes:

```ts
const StatusOption = c.div<{
  selected: boolean;
  first: boolean;
}>((props) => [
  "px-3 py-1.5",
  props.selected ? "bg-sky-50" : "bg-white",
  props.first && "rounded-t-lg",
]);

StatusOption({ selected: true, first: false })(
  [...bundleAttributes, h.Key("planned")],
  ["Planned"],
);
```

## Class attributes are merged

Foldkit's renderer does not merge multiple `Class` attributes: the last one on
an element replaces every earlier class value. A wrapper that merely prepended
its base class would therefore lose that class whenever a caller supplied
another `h.Class(...)`.

Classy partitions caller attributes, combines every caller `Class` value with
the configured classes using `cn`, and emits one leading `Class` attribute.
All non-class attributes remain in their original order, including
`ChildAttribute` values spread from `@foldkit/ui` bundles:

```ts
const Card = c.div("rounded-lg bg-white");

Card(
  [...bundleAttributes, h.Class("ring-2 ring-sky-500"), h.Key("card")],
  ["Content"],
);
```

The result has one class value containing both `rounded-lg bg-white` and
`ring-2 ring-sky-500`; the bundle attributes and `Key` pass through untouched.

## Void elements

Foldkit void elements retain their attributes-only signature:

```ts
const SearchInput = c.input("rounded border px-3 py-2");

SearchInput([h.Type("search"), h.Class("w-full")]);
```

## Utilities

The package also exports the shared `cn`, `ifElse`, and `switchCase` helpers:

```ts
import { classy, ifElse, switchCase } from "@djgrant/classy-foldkit";

const Badge = classy<Message>().span<{ tone: "info" | "danger" }>((props) => [
  "rounded px-2 py-1",
  switchCase(props.tone, {
    info: "bg-sky-50 text-sky-700",
    danger: "bg-red-50 text-red-700",
  }),
  ifElse(props.tone === "danger", "font-semibold"),
]);
```
