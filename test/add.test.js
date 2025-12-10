// test/add.test.js
import { add } from '../src/index.js';
import { expect } from 'chai';

describe("add", () => {
  it("adds numbers", () => {
    expect(add(2, 3)).to.equal(5);
  });
});
