import { concat } from "../index";

describe("concat", () => {
  it("concatinate", () => {
    expect(concat([1, 2], [3])).toEqual([1, 2, 3]);
    expect(concat("hel", "lo")).toEqual("hello");
    expect(concat("curr")("ied")).toEqual("curried");
  });
});
