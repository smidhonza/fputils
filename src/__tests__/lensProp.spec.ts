import { lensProp, set, view } from '../lens';

describe("lensProp", () => {
  it("should do lensing with view", () => {
    const nameLens = lensProp("name");

    expect(view(nameLens, { name: "A" })).toEqual("A");
    expect(view(nameLens)({ name: "B" })).toEqual("B");
  });

  it("should do lensing with set", () => {
    const nameLens = lensProp("name");

    expect(set(nameLens, "X", { name: "C" })).toEqual({ name: "X" });
    expect(set(nameLens, "V")({ name: "D" })).toEqual({ name: "V" });
  });
});
