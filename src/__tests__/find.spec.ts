import { find } from "../index";

describe("find", () => {
  it("returns an item when found", () => {
    expect(<number>find(item => item === 2, [2, 3])).toEqual(2);
    expect(find(item => item.id === 2, [{ id: 2 }, { id: 3 }])).toEqual({ id: 2 });

    expect(find(item => item.id === 3)([{ id: 2 }, { id: 3 }])).toEqual({ id: 3 });
  });

  it("returns a null when could not found", () => {
    expect(<string>find(item => item === "?")([])).toEqual(undefined);
    expect(find(item => item === "33", [])).toEqual(undefined);
    expect(<number>find(item => item === 4, [2, 3])).toEqual(undefined);
    expect(find(item => item.id === 4, [{ id: 2 }, { id: 3 }])).toEqual(undefined);
  });
});
