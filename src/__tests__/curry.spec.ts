import { curry } from "../curry";

describe("curry", () => {
  it("returns a curried sum function", () => {
    const sum = curry((a, b, c, d) => a + b + c + d);
    expect(sum(1, 2, 3, 4)).toEqual(10);
  });

  it("returns a function if you miss the params", () => {
    const sum = curry((a, b, c, d) => a + b + c + d);

    const sum1 = sum(1);
    const sum2 = sum1(2);
    const sum3 = sum2(3);
    expect(sum3(4)).toEqual(10);
  });

  it("combines the two approaches and still returns correct values", () => {
    const sum = curry((a, b, c, d) => a + b + c + d);

    const sum1 = sum(1, 2);
    const sum2 = sum1(3);
    expect(sum2(4)).toEqual(10);
  });
});
