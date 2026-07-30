import test from "node:test";
import assert from "node:assert/strict";
import { inertHtml as h } from "foldkit/html";

import { classy } from "../src/index.js";

const c = classy();

test("merges every Class value into one leading class result", () => {
  const Button = c.button("base", ["rounded"]);
  const vnode = Button(
    [h.Title("Save"), h.Class("caller-one"), h.Class("caller-two"), h.Id("save")],
    ["Save"],
    h,
  );

  assert.deepEqual(vnode.data.class, {
    base: true,
    rounded: true,
    "caller-one": true,
    "caller-two": true,
  });
  assert.deepEqual(Object.keys(vnode.data.props), ["title", "id"]);
  assert.equal(vnode.children[0].text, "Save");
});

test("preserves non-Class attributes in order, including ChildAttribute values", () => {
  const childAttribute = {
    __childAttribute: true,
    attribute: h.Title("from child"),
    dispatch: () => {},
    resolveUnmount: () => () => {},
    boundaryMappers: [],
  };
  const Box = c.div("box");
  const vnode = Box([childAttribute, h.Class("caller"), h.Id("box")], [], h);

  assert.deepEqual(vnode.data.class, { box: true, caller: true });
  assert.deepEqual(Object.keys(vnode.data.props), ["title", "id"]);
  assert.equal(vnode.data.props.title, "from child");
});

test("variant mappers return a props-curried element function", () => {
  const Status = c.div(({ $selected, $first }) => [
    "status",
    $selected ? "selected" : "unselected",
    { first: $first },
  ]);
  const vnode = Status({ $selected: true, $first: false })(
    [h.Class("caller"), h.Key("planned")],
    ["Planned"],
    h,
  );

  assert.deepEqual(vnode.data.class, {
    status: true,
    selected: true,
    caller: true,
  });
  assert.equal(vnode.key, "planned");
});

test("void elements accept attributes and the builder only", () => {
  const Input = c.input("field");
  const vnode = Input([h.Class("wide"), h.Type("text")], h);

  assert.equal(vnode.sel, "input");
  assert.deepEqual(vnode.data.class, { field: true, wide: true });
  assert.equal(vnode.data.props.type, "text");
  assert.deepEqual(vnode.children, []);
});

test("exposes Foldkit tags beyond the core's predeclared tag list", () => {
  const Search = c.search("search");
  const vnode = Search([], [], h);

  assert.equal(vnode.sel, "search");
  assert.deepEqual(vnode.data.class, { search: true });
});
