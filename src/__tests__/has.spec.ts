import {has} from "../has";

describe("has", () => {
  it("checks if object has a property", () => {
    expect(has('name', {name: 'John'})).toEqual(true);
    expect(has('surname', {name: 'John', surname: undefined})).toEqual(false);
  });
});
