import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { createComponent, Dynamic, renderToString, createDynamic } from "solid-js/web";
import { cn, ifElse, switchCase } from "../../../packages/core/src/index.js";
import { createClassySolid } from "../src/factory.js";
import { classy as publishedClassy } from "../src/index.js";

// The published package uses createDynamic for string tags so SSR
// consumers do not need Solid JSX transforms inside node_modules.
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

test("preserves non-enumerable refs for intrinsic elements", () => {
  let seenProps;

  const classyWithSpy = createClassySolid((tag, props) => {
    seenProps = props;
    return createDynamic(() => tag, props);
  });
  const Box = classyWithSpy.div("box");
  const ref = () => {};
  const props = {
    children: "Hello",
  };

  Object.defineProperty(props, "ref", {
    configurable: true,
    value: ref,
  });

  renderToString(() => createComponent(Box, props));

  assert.equal(seenProps.ref, ref);
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

test("preserves non-enumerable refs for wrapped components", () => {
  let seenProps;

  const Base = (props) => {
    seenProps = props;
    return createComponent(Dynamic, {
      component: "div",
      class: props.class,
      children: props.children,
    });
  };
  const Wrapped = classy(Base)("base");
  const ref = () => {};
  const props = {
    children: "Hello",
  };

  Object.defineProperty(props, "ref", {
    configurable: true,
    value: ref,
  });

  renderToString(() => createComponent(Wrapped, props));

  assert.equal(seenProps.ref, ref);
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

test("published package entry renders intrinsic elements during SSR", () => {
  const Box = publishedClassy.div(({ $tone }) => ["box", $tone]);
  const html = renderToString(() =>
    createComponent(Box, {
      $tone: "loud",
      class: "extra",
      children: "Hello",
    }),
  );

  assert.match(html, /^<div /);
  assert.match(html, /class="box loud extra ?"/);
  assert.match(html, />Hello<\/div>$/);
});

test("published package no longer ships JSX-only solid intrinsics", async () => {
  const source = await readFile(new URL("../src/classy.js", import.meta.url), "utf8");

  assert.match(source, /createDynamic/);
  assert.doesNotMatch(source, /intrinsics/);
  assert.doesNotMatch(source, /document\.createElement/);
});
