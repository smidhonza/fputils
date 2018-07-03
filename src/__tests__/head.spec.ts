import { compose, head } from "../index";

describe("head", () => {
  it("returns first element from array", () => {
    expect(head(["a", "b", "c"])).toEqual("a");
    expect(head([])).toEqual(undefined);
    expect(compose(head)(["r", "f"])).toEqual("r");
  });
});
