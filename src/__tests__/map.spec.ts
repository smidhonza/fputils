import { map } from "../array";

describe("map", () => {
  it("maps over given array", () => {
    const doubles = number => number * 2;

    expect(map(doubles, [2, 4])).toEqual([4, 8]);
    expect(map(doubles)([1])).toEqual([2]);
    expect(map(doubles)([])).toEqual([]);
  });
});
