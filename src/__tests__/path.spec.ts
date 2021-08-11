import { path } from '../path';

describe("path", () => {
  it("should work", () => {
    expect(path(["name"])({ id: 7 })).toEqual(undefined);

    expect(path(["name"])({ name: "B" })).toEqual("B");

    expect(path(["a", "b"])({ a: { b: 6 } })).toEqual(6);
  });
  it("should work curried", () => {
    expect(path(["name"], { id: 7 })).toEqual(undefined);
    expect(path(["name"], { name: "B" })).toEqual("B");
  });
});
