import { propEq } from '../prop';

describe("propEq", () => {
  it("returns right property match", () => {
    expect(propEq("name", 5, { name: 5 })).toEqual(true);
    expect(propEq("name", "test 1")({ name: "test 1" })).toEqual(true);
    expect(propEq("name", "test 2")({ name: "test 1" })).toEqual(false);
  });
});
