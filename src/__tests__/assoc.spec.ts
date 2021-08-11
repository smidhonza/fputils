import { assoc } from '../assoc';

describe("assoc", () => {
  it("should work", () => {
    expect(assoc("a", 3, { b: 4 })).toEqual({ a: 3, b: 4 });
    expect(assoc("a", 1)({})).toEqual({ a: 1 });
  });
});
