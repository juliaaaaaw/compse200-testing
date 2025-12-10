// test/subtract.test.js
import { expect } from "chai";
import { subtract } from "../src/subtract.js";

describe("subtract", () => {
  it("subtracts positive numbers", () => {
    expect(subtract(5, 3)).to.equal(2);
  });

  it("subtracts resulting in negative numbers", () => {
    expect(subtract(2, 5)).to.equal(-3);
  });
});
