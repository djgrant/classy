import test from "node:test";
import assert from "node:assert/strict";

import { createComponent, Dynamic, renderToString, createDynamic } from "solid-js/web";
import { cn, ifElse, switchCase } from "../../../packages/core/src/index.js";
import { createClassySolid } from "../src/factory.js";

// For testing, use createDynamic (the runtime path) since bare Node
// can't run JSX. The intrinsics JSX path is tested via integration
// with a Solid-aware bundler (Vite + vite-plugin-solid).
const classy = createClassySolid((tag, props) => {
  return createDynamic(() => tag, props);
});

test("filters transient props on intrinsic elements", () => {
  const Box = classy.div(({ $tone }) => ["box", $tone]);
  const html = renderToString(() =>
    createComponent(Box, {
      $tone: "loud",
      class: "extra",
      "data-test": "box",
      children: "Hello",
      hidden: true,
    }),
  );

  assert.match(html, /^<div /);
  assert.match(html, /class="box loud extra ?"/);
  assert.match(html, /data-test="box"/);
  assert.match(html, / hidden/);
  assert.doesNotMatch(html, /\$tone=/);
});

test("uses the rendered as tag when forwarding props", () => {
  const Button = classy.button("button");
  const html = renderToString(() =>
    createComponent(Button, {
      as: "a",
      children: "Docs",
      class: "link",
      href: "/docs",
    }),
  );

  assert.match(html, /^<a /);
  assert.match(html, /class="button link ?"/);
  assert.match(html, /href="\/docs"/);
});

test("preserves wrapped component statics and forwards non-transient props", () => {
  let seenProps;

  const Base = (props) => {
    seenProps = props;
    return createComponent(Dynamic, {
      component: "div",
      class: props.class,
      children: props.children,
    });
  };
  Base.role = "base";

  const Wrapped = classy(Base)((props) => ["base", props.tone]);
  const html = renderToString(() =>
    createComponent(Wrapped, {
      $tone: "ignored",
      children: "Hello",
      class: "extra",
      tone: "accent",
    }),
  );

  assert.equal(Wrapped.role, "base");
  assert.equal(Wrapped.displayName, "classy(Base)");
  assert.equal(seenProps.tone, "accent");
  assert.equal(seenProps.$tone, undefined);
  assert.equal(seenProps.class, "base accent extra");
  assert.match(html, /class="base accent extra ?"/);
});

test("re-exports shared helpers", () => {
  assert.equal(ifElse(true, "yes", "no"), "yes");
  assert.equal(ifElse(false, "yes", "no"), "no");
  assert.equal(switchCase("lg", { sm: "small", lg: "large" }), "large");
  assert.equal(
    switchCase("md", { sm: "small", default: "medium" }),
    "medium",
  );
  assert.equal(
    cn("base", ["accent"], { hidden: false, visible: true }),
    "base accent visible",
  );
});
