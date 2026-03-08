import test from "node:test";
import assert from "node:assert/strict";

import {
  cn,
  createClassy,
  defineProxyProps,
  filterProps,
  ifElse,
  resolveClassNames,
  switchCase,
} from "../src/index.js";

test("createClassy exposes tag helpers and passes mapper args through", () => {
  const calls = [];
  const classy = createClassy((tag, args) => {
    calls.push({ tag, args });
    return { tag, args };
  });

  const mapper = (props) => ["base", props.kind];
  const result = classy.button(mapper);

  assert.deepEqual(result, { tag: "button", args: [mapper] });
  assert.equal(calls[0].tag, "button");
  assert.equal(calls[0].args[0], mapper);
  assert.equal(classy.string("base", { active: true }), "base active");
});

test("filters plain and proxy props while stripping transient keys", () => {
  const props = {
    $tone: "loud",
    class: "extra",
    id: "box",
    role: "presentation",
  };

  assert.deepEqual(filterProps(props, { exclude: ["class"] }), {
    id: "box",
    role: "presentation",
  });

  const proxied = defineProxyProps(props, { exclude: ["class"] });
  assert.deepEqual(Object.keys(proxied), ["id", "role"]);
  assert.equal(proxied.id, "box");
  assert.equal(proxied.role, "presentation");
});

test("resolves classes and exports utility helpers", () => {
  const mapper = (props) => ["base", props.kind];

  assert.deepEqual(resolveClassNames([mapper], { kind: "accent" }), [
    "base",
    "accent",
  ]);
  assert.deepEqual(resolveClassNames(["base", "accent"], { kind: "accent" }), [
    "base",
    "accent",
  ]);
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
