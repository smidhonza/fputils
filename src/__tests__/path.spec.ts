import { path } from '../path';

describe("path", () => {
  it("should work", () => {
    expect(path("name")({ id: 7 })).toEqual(undefined);

    expect(path("name")({ name: "Honza" })).toEqual("Honza");

    expect(path<number>("a", "b")({ a: { b: 6 } })).toEqual(6);
  });
});
