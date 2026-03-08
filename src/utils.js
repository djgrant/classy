export const switchCase = (key, cases) =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : cases.default;

export const ifElse = (predicate, pass, fail) => (predicate ? pass : fail);
