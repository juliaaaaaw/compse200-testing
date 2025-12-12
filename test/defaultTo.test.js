import { expect } from 'chai';
import defaultTo from "../src/defaultTo.js";

describe("Test cases for defaultTo.js", () => {
    it("TC001: returns original value when not null or undefined", () => {
        expect(defaultTo(1, 10)).to.equal(1);
        expect(defaultTo(0, 10)).to.equal(0);
        expect(defaultTo(false, 10)).to.equal(false);
        expect(defaultTo('', 10)).to.equal('');
        expect(defaultTo([], 10)).to.deep.equal([]);
        expect(defaultTo({}, 10)).to.deep.equal({});
        expect(defaultTo(NaN, 10)).to.be.NaN;
    });

    it("TC002: returns default for null or undefined", () => {
        expect(defaultTo(null, 10)).to.equal(10);
        expect(defaultTo(undefined, 10)).to.equal(10);
    });
});