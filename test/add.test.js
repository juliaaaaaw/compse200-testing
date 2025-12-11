import { expect } from 'chai';
import add from "../src/add.js";

describe("Test cases for add.js", () => {
    it("TC001: basic case", () => {
        expect(add(3, 5)).to.equal(8);
    });

    it("TC002: Test adding a negative ", () => {
        expect(add(5, -5)).to.equal(0);
    });

    it("TC003: Test adding a positive number to a negative number", () => {
        expect(add(-2, 3)).to.equal(1);
    });

    it("TC004: Test adding a negative number to a negative number", () => {
        expect(add(-2, -10)).to.equal(-12);
    });

    it("TC005: Test zero case", () => {
        expect(add(0, 0)).to.equal(0);
    });

    it("TC006: Test adding a null to a number", () => {
        expect(add(12, null)).to.be.null;
    });

    it("TC007: Test adding a number to a null", () => {
        expect(add(12, null)).to.be.null;
    });

    it("TC008: Test error handling with first parameter", () => {
        expect(add(3, "asd")).to.throw(TypeError, "secondNum is not a number");
    });

    it("TC009: Test error handling with second parameter", () => {
        expect(add("jkl", 5)).to.throw(TypeError, "firstNum is not a number");
    });

});