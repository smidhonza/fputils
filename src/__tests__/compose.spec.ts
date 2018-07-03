import { compose } from "../index";

describe("compose", () => {
  it("returns composed result", () => {
    const add5 = a => a + 5;
    const add10 = a => a + 10;

    expect(
      compose(
        add10,
        add5
      )(20)
    ).toEqual(35);
    expect(
      compose(
        add10,
        add5,
        add5,
        add10,
        add5
      )(7)
    ).toEqual(42);
  });
});
