import { expect } from 'chai';
import clamp from "../src/clamp.js";

describe("Test cases for clamp.js", () => {
    // Basic clamping behavior
    it("TC001: number below lower bound", () => {
        expect(clamp(-10, -5, 5)).to.equal(-5);
    });

    it("TC002: number above upper bound", () => {
        expect(clamp(10, -5, 5)).to.equal(5);
    });

    it("TC003: number within bounds", () => {
        expect(clamp(0, -5, 5)).to.equal(0);
    });

    // Boundary values
    it("TC004: number equals lower bound", () => {
        expect(clamp(-5, -5, 5)).to.equal(-5);
    });

    it("TC005: number equals upper bound", () => {
        expect(clamp(5, -5, 5)).to.equal(5);
    });

    // NaN and invalid inputs
    it("TC006: NaN number input", () => {
        expect(clamp(NaN, -5, 5)).to.be.NaN;
    });

    it("TC007: NaN lower or upper bound", () => {
        expect(clamp(3, NaN, 10)).to.equal(3);  // lower → 0, upper = 10 → clamped to lower (0)? Wait!
        // But note: implementation replaces NaN bounds with 0
        // So clamp(3, NaN, 10) → clamp(3, 0, 10) → 3 is in [0,10] → returns 3
        // Similarly:
        expect(clamp(3, -10, NaN)).to.equal(0); // upper → 0, so clamp(3, -10, 0) → 0
        expect(clamp(3, NaN, NaN)).to.equal(0); // becomes clamp(3, 0, 0) → 0
    });

    // Type coercion
    it("TC008: string number inputs (coerced)", () => {
        expect(clamp("3", "1", "5")).to.equal(3);
        expect(clamp("10", "0", "5")).to.equal(5);
    });
    
});