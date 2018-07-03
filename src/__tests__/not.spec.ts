import { not } from "../index";

describe("not", () => {
  it("negate the input value", () => {
    expect(not(true)).toEqual(false);
    expect(not(false)).toEqual(true);
    expect(not(1)).toEqual(false);
    expect(not(0)).toEqual(true);
    expect(not("")).toEqual(true);
    expect(not(null)).toEqual(true);
  });

  it("negate the input value curried", () => {
    expect(not()(true)).toEqual(false);
    expect(not()(false)).toEqual(true);
  });
});
