import { remove } from "../index";

describe("remove", () => {
  it("remove value from array and won't modify the current array", () => {
    const list = ["a", "b", "c"];
    expect(remove("c", list)).toEqual(["a", "b"]);
    expect(list).toEqual(["a", "b", "c"]);
  });

  it("remove won't modify the array when the value does not exist in that array", () => {
    const list = ["a", "b"];
    expect(remove("c", list)).toEqual(["a", "b"]);
  });

  it("removes curried", () => {
    expect(remove("b")(["a", "b", "c"])).toEqual(["a", "c"]);
    expect(remove(" - ")([" - ", "b", "c", ""])).toEqual(["b", "c", ""]);
  });
});
