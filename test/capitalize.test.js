import { expect } from 'chai';
import capitalize from "../src/capitalize.js";

describe("Test cases for capitalize.js", () => {
    // Basic functionality
    it("TC001: basic case - all uppercase", () => {
        expect(capitalize('FRED')).to.equal('Fred');
    });

    it("TC002: basic case - all lowercase", () => {
        expect(capitalize('hello')).to.equal('Hello');
    });

    it("TC003: mixed case", () => {
        expect(capitalize('hELLo WoRLd')).to.equal('Hello world');
    });

    // Edge cases with empty or whitespace-only strings
    it("TC004: empty string", () => {
        expect(capitalize('')).to.equal('');
    });

    it("TC005: string with only whitespace", () => {
        expect(capitalize('   ')).to.equal('   ');
    });

    // Non-string inputs (should be handled via toString internally)
    it("TC006: null input", () => {
        expect(capitalize(null)).to.equal('Null');
    });

    it("TC007: undefined input", () => {
        expect(capitalize(undefined)).to.equal('Undefined');
    });

    it("TC008: number input", () => {
        expect(capitalize(123)).to.equal('123');
    });

    it("TC009: boolean input", () => {
        expect(capitalize(true)).to.equal('True');
        expect(capitalize(false)).to.equal('False');
    });

    it("TC010: object input (toString fallback)", () => {
        expect(capitalize({})).to.equal('[object object]');
    });

    // Single-character strings
    it("TC011: single lowercase character", () => {
        expect(capitalize('a')).to.equal('A');
    });

    it("TC012: single uppercase character", () => {
        expect(capitalize('Z')).to.equal('Z');
    });

    it("TC013: single non-letter character", () => {
        expect(capitalize('3')).to.equal('3');
        expect(capitalize('@')).to.equal('@');
    });

    // Unicode and special characters
    it("TC014: string with accented characters", () => {
        expect(capitalize('ñandú')).to.equal('Ñandú');
    });

    it("TC015: emoji", () => {
        expect(capitalize('😊')).to.equal('😊');
    });
});