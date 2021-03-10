import { concat } from "../array";

describe("concat", () => {
  it("concatinate", () => {
    expect(concat([1, 2], [3])).toEqual([1, 2, 3]);
    expect(concat("hel", "lo")).toEqual("hello");
    expect(concat("curr")("ied")).toEqual("curried");
    expect(concat([1])("what")).toEqual([1, "what"]);
    expect(concat('start with:')(8)).toEqual("start with:8");
    expect(concat('a')(['?', '!', 'x'])).toEqual("a?,!,x");
  });
});
