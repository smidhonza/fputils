import { equals } from "../equals";

describe("equals", () => {
  it("compares 2 numbers", () => {
    expect(equals(4, 4)).toEqual(true);
    expect(equals(4, 2)).toEqual(false);
    expect(equals(3)(3)).toEqual(true);
    expect(equals(3)(1)).toEqual(false);
  });
});
