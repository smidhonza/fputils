import { tail } from "../array";
import { compose } from '../compose';

describe("tail", () => {
  it("remove head from array", () => {
    expect(tail(["a", "b", "c"])).toEqual(["b", "c"]);
    expect(compose(tail)(["a", "b"])).toEqual(["b"]);
  });

  it("does not blow up when no argument", () => {
    expect(tail()).toEqual([]);
  });
});
