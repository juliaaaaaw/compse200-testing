import { expect } from 'chai';
import camelCase from "../src/camelCase.js";

describe("Test cases for camelCase.js", () => {
    // Basic functionality
    it("TC001: basic space-separated words", () => {
        expect(camelCase('Foo Bar')).to.equal('fooBar');
    });

    it("TC002: kebab-case input", () => {
        expect(camelCase('--foo-bar--')).to.equal('fooBar');
    });

    it("TC003: snake_case input", () => {
        expect(camelCase('__FOO_BAR__')).to.equal('fooBar');
    });

    // Mixed delimiters and casing
    it("TC004: mixed delimiters and extra whitespace", () => {
        expect(camelCase('  Foo_Bar--baz  ')).to.equal('fooBarBaz');
    });

    it("TC005: all uppercase with underscores", () => {
        expect(camelCase('HELLO_WORLD')).to.equal('helloWorld');
    });

    it("TC006: already camelCased input", () => {
        expect(camelCase('fooBar')).to.equal('fooBar');
    });

    // Edge cases
    it("TC007: empty string", () => {
        expect(camelCase('')).to.equal('');
    });

    it("TC008: string with only delimiters", () => {
        expect(camelCase('---___')).to.equal('');
    });

    it("TC009: single word", () => {
        expect(camelCase('hello')).to.equal('hello');
        expect(camelCase('HELLO')).to.equal('hello');
    });

    // Non-string inputs (relies on toString internally)
    it("TC010: null input", () => {
        expect(camelCase(null)).to.equal('null');
    });

    it("TC011: undefined input", () => {
        expect(camelCase(undefined)).to.equal('undefined');
    });

    it("TC012: number input", () => {
        expect(camelCase(123)).to.equal('123');
    });

    it("TC013: boolean input", () => {
        expect(camelCase(true)).to.equal('true');
        expect(camelCase(false)).to.equal('false');
    });

    // Apostrophes and special characters (should be removed before processing)
    it("TC014: string with apostrophe", () => {
        expect(camelCase("it's a test")).to.equal('itsATest');
    });

    it("TC015: string with Unicode apostrophe (U+2019)", () => {
        expect(camelCase("don’t worry")).to.equal('dontWorry');
    });

    // Complex real-world examples
    it("TC016: PascalCase input", () => {
        expect(camelCase('XMLHttpRequest')).to.equal('xmlHttpRequest');
    });

    it("TC017: sentence with punctuation", () => {
        expect(camelCase('Hello, world! How are you?')).to.equal('helloWorldHowAreYou');
    });

    // Unicode and international characters
    it("TC018: accented characters", () => {
        expect(camelCase('café au lait')).to.equal('cafeAuLait');
    });

    it("TC019: non-Latin script transliteration (e.g., pinyin)", () => {
        expect(camelCase('Bei Jing')).to.equal('beiJing');
    });
});