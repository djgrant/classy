export const switchCase = (key, cases) =>
  cases.hasOwnProperty(key) ? cases[key] : cases.default;

export const ifElse = (predicate, pass, fail) => (predicate ? pass : fail);
