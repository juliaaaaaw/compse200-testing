import { expect } from 'chai';
import ceil from "../src/ceil.js";

describe("Test cases for ceil.js", () => {
    it("TC001: should round up with default precision", () => {
        expect(ceil(3.008)).to.equal(4);
    });

    it("TC002: Test rounding up", () => {
        expect(ceil(3.3, 0)).to.equal(4);
    });

    it("TC003: Test positive precision", () => {
        expect(ceil(4.006, 2)).to.equal(4.01);
    });

    it("TC004: Test negative precision", () => {
        expect(ceil(2540, -2)).to.equal(2600);
    });

    it("TC005: Test with negative number", () => {
        expect(ceil(-3.188, 1)).to.equal(-3.1);
    });
    
    it("TC006: Test null handling", () => {
        expect(ceil(null, null)).to.be.NaN;
    });

    it("TC007: Test unexpected value for number", () => {
        expect(() => ceil("asdf", 2)).to.throw(TypeError, "Error, entered parameter 'number' is not a number");
    });

    it("TC008: Test unexpected value for precision", () => {
        expect(() => ceil(5040, "jkl")).to.throw(TypeError, "Error, entered parameter 'precision' is not a number");
    });

    it("TC009: Test case where precision is significantly different from number", () => {
        expect(ceil(0.0023, -5)).to.equal(100000);
    });

});