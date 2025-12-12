import { expect } from 'chai';
import isEmpty from "../src/isEmpty.js";

describe("Test cases for isEmpty.js", () => {
    // Primitives
    it("TC001: null, undefined, boolean, and number inputs", () => {
        expect(isEmpty(null)).to.be.true;
        expect(isEmpty(undefined)).to.be.true;
        expect(isEmpty(true)).to.be.true;
        expect(isEmpty(42)).to.be.true;
    });

    // Arrays and strings
    it("TC002: arrays and strings", () => {
        expect(isEmpty([])).to.be.true;
        expect(isEmpty([1])).to.be.false;
        expect(isEmpty('')).to.be.true;
        expect(isEmpty('abc')).to.be.false;
    });

    // Objects
    it("TC003: plain objects", () => {
        expect(isEmpty({})).to.be.true;
        expect(isEmpty({ a: 1 })).to.be.false;
    });

    // Maps and Sets
    it("TC004: Map and Set", () => {
        expect(isEmpty(new Map())).to.be.true;
        expect(isEmpty(new Set([1]))).to.be.false;
    });

    // Arguments and array-like
    it("TC005: arguments and array-like objects", () => {
        expect(isEmpty((function() { return arguments; })())).to.be.true;
        expect(isEmpty((function() { return arguments; })(1))).to.be.false;

        const arrayLike = { length: 0, splice: Array.prototype.splice };
        expect(isEmpty(arrayLike)).to.be.true;
    });

    // TypedArray and edge exotic objects
    it("TC006: TypedArray, Date, and RegExp", () => {
        expect(isEmpty(new Uint8Array(0))).to.be.true;
        expect(isEmpty(new Date())).to.be.true;
        expect(isEmpty(/abc/)).to.be.true;
    });
});