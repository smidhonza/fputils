import { foldr } from '../foldr';

describe("foldr", () => {
  it("should work", () => {
    const sum = (accumulator, value) => accumulator + value;

    expect(foldr(sum, 1, [2, 3])).toEqual(6);
    expect(foldr(sum, 2)([4, 6])).toEqual(12);
    expect(foldr(sum, 8)(undefined)).toEqual(8);
  });

  it("reduce an object", () => {
    const func = (accumulator, value) => ({ ...accumulator, ...value });

    expect(foldr(func, {})([{ a: "1" }, { b: 2 }])).toEqual({ a: "1", b: 2 });
  });
});
