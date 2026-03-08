import test from "node:test";
import assert from "node:assert/strict";
import React from "react";

import { classy, cn, ifElse, switchCase } from "../src/index.js";

test("filters transient and invalid DOM props on intrinsic elements", () => {
  const Box = classy.div(({ $tone }) => ["box", $tone]);
  const element = Box.render(
    {
      $tone: "loud",
      className: "extra",
      "data-test": "box",
      children: "Hello",
      hidden: true,
      tone: "should-not-forward",
    },
    null,
  );

  assert.equal(element.type, "div");
  assert.deepEqual(element.props, {
    children: "Hello",
    className: "box loud extra",
    "data-test": "box",
    hidden: true,
    ref: null,
  });
});

test("uses the rendered as tag when forwarding props", () => {
  const Button = classy.button("button");
  const element = Button.render(
    {
      as: "a",
      children: "Docs",
      className: "link",
      href: "/docs",
    },
    null,
  );

  assert.equal(element.type, "a");
  assert.deepEqual(element.props, {
    children: "Docs",
    className: "button link",
    href: "/docs",
    ref: null,
  });
});

test("preserves wrapped component statics and forwards non-transient props", () => {
  const Base = (props) =>
    React.createElement("div", { className: props.className }, props.children);
  Base.role = "base";

  const Wrapped = classy(Base)((props) => ["base", props.tone]);
  const element = Wrapped.render(
    {
      $tone: "ignored",
      children: "Hello",
      className: "extra",
      tone: "accent",
    },
    null,
  );

  assert.equal(Wrapped.role, "base");
  assert.equal(Wrapped.displayName, "classy(Base)");
  assert.equal(element.type, Base);
  assert.deepEqual(element.props, {
    children: "Hello",
    className: "base accent extra",
    ref: null,
    tone: "accent",
  });
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
