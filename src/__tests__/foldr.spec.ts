import { foldr } from "../index";

describe("foldr", () => {
  it("should work", () => {
    const add = (accumulator, value) => accumulator + value;

    expect(foldr(add, 1, [2, 3])).toEqual(6);
    expect(foldr(add, 2)([4, 6])).toEqual(12);
  });

  it("reduce an object", () => {
    const func = (accumulator, value) => ({ ...accumulator, ...value });

    expect(foldr(func, {})([{ a: "1" }, { b: 2 }])).toEqual({ a: "1", b: 2 });
  });
});
