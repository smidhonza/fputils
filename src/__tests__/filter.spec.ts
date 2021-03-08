import { filter } from "../array";

describe("filter", () => {
  const minTwo = number => number >= 2;

  it("filters", () => {
    expect(filter(minTwo, [1, 2, 3, 4])).toEqual([2, 3, 4]);
    expect(filter(string => string !== "a", ["a", "b"])).toEqual(["b"]);
  });

  it("filters curried", () => {
    expect(filter(minTwo)([1, 2, 3, 4])).toEqual([2, 3, 4]);
    expect(filter(string => string !== "a")(["a", "b"])).toEqual(["b"]);
  });
});
