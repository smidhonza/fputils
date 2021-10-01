import { propEq } from '../propEq';

describe("propEq", () => {
  it("returns right property match", () => {
    expect(propEq("name", 5, { name: 5 })).toEqual(true);
    expect(propEq("name","test 1", { name: "test 1" })).toEqual(true);
    expect(propEq("name","test 2", { name: "test 1" })).toEqual(false);
  });

  it("returns right property when match curried", () => {
    expect(propEq("name", 5)({ name: 5 })).toEqual(true);
    expect(propEq("name", "test 1")({ name: "test 1" })).toEqual(true);
    expect(propEq("name", "test 2")({ name: "test 1" })).toEqual(false);
  });

  it("returns right property when match curried twice", () => {
    expect(propEq("name")(5)({ name: 5 })).toEqual(true);
    expect(propEq("name")("test 1")({ name: "test 1" })).toEqual(true);
    expect(propEq("name")("test 2")({ name: "test 1" })).toEqual(false);
  });
});
