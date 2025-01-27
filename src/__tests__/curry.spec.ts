import {curry} from "../curry";

describe("curry", () => {
  it("returns a curried sum function", () => {
    const sum = curry((a: number) => a + 10);
    expect(sum(1)).toEqual(11);

    const sum2 = curry((a: number, b: number) => a + b);
    expect(sum2(1, 2)).toEqual(3);

    const sum3 = curry((a: number, b: number, c: number) => a + b + c);
    expect(sum3(1, 2, 3)).toEqual(6);

    const sum4 = curry((a: number, b: number, c: number, d: number) => a + b + c + d);
    expect(sum4(1, 2, 3, 4)).toEqual(10);
  });

  it("returns a function if you miss the params", () => {
    const sum = curry((a: number, b: number, c: number, d: number) => a + b + c + d);
    const sum1 = sum(1);
    const sum2 = sum1(2);
    const sum3 = sum2(3);
    const sum4 = sum3(4);

    expect(sum4).toEqual(10);
  });

  it("combines the two approaches and still returns correct values", () => {
    const sum = curry((a: number, b: number, c: number, d: number) => a + b + c + d);

    const sum1 = sum(1, 2);
    const sum2 = sum1(3);
    expect(sum2(4)).toEqual(10);
  });
});
