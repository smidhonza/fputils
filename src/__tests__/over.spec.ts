import { lensProp, over } from "../lens";

describe("over", () => {
  it("should apply a function to the lens", () => {
    const nameLens = lensProp("name");
    const toUpper = string => (string ? string.toUpperCase() : undefined);

    expect(over(nameLens, toUpper, { a: "b" })).toEqual({ a: "b" });
    expect(over(nameLens, toUpper, { name: "honza" })).toEqual({ name: "HONZA" });
    expect(over(nameLens, toUpper)({ name: "curried" })).toEqual({ name: "CURRIED" });
  });
});
