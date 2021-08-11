import { lensPath, set, view } from '../lens';

describe("lensPath", () => {
  it("should do lensing one level deep", () => {
    const nameLens = lensPath(["name"]);

    expect(view(nameLens, { name: "A" })).toEqual("A");
    expect(view(nameLens)({ name: "B" })).toEqual("B");
  });

  it("should do lensing more levels deep", () => {
    const nameLens = lensPath(["person", "name"]);

    expect(view(nameLens, { person: { name: "Anna" }})).toEqual("Anna");
    expect(view(nameLens, { person: { name: { first: "Beta"} }})).toEqual({first: "Beta"});
    expect(view(nameLens)({ person: "Carl" })).toEqual(undefined);
  });

  it("should do lensing with set", () => {
    const nameLens = lensPath(["person", "name"]);

    expect(set(nameLens, "Delta", { person: { name: "X" }})).toEqual({ person: { name: "Delta" } });
    expect(set(nameLens, "V", {})).toEqual({ person: { name: "V" } });
  });
});
