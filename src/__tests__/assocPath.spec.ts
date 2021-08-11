import { assocPath } from '../assocPath';

describe("assocPath", () => {
  it("should work", () => {

    const a = assocPath(["a"]);

    expect(assocPath(["a"], 1)({})).toEqual({ a: 1 });

    expect(assocPath(["user", "name"], 'Pepa', { b: 4 })).toEqual({
      b: 4,
      user: {
        name: 'Pepa'
      }
    });

    expect(assocPath(["users", "count"], 54)({})).toEqual({
      users: {
        count: 54
      }
    });
  });
});
