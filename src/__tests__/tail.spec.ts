import { compose, tail } from "../index";

describe("tail", () => {
  it("remove head from array", () => {
    expect(tail(["a", "b", "c"])).toEqual(["b", "c"]);
    expect(compose(tail)(["a", "b"])).toEqual(["b"]);
  });
});
