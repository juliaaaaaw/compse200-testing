import { expect } from 'chai';
import map from "../src/map.js";

describe("Test cases for map.js", () => {
    it("TC001: basic case - squares numbers", () => {
        const result = map([2, 3], (n) => n * n);
        expect(result).to.deep.equal([4, 9]);
    });

    it("TC002: empty array", () => {
        const result = map([], (x) => x + 1);
        expect(result).to.deep.equal([]);
    });

    it("TC003: null or undefined array", () => {
        expect(map(null, () => 0)).to.deep.equal([]);
        expect(map(undefined, () => 0)).to.deep.equal([]);
    });

    it("TC004: iteratee receives value, index, array", () => {
        const input = ['a', 'b'];
        const result = map(input, (value, index, arr) => {
            expect(arr).to.equal(input);
            return `${value}${index}`;
        });
        expect(result).to.deep.equal(['a0', 'b1']);
    });

    it("TC005: preserves order and length", () => {
        const input = [10, 20, 30];
        const result = map(input, (x) => x / 10);
        expect(result).to.deep.equal([1, 2, 3]);
        expect(result.length).to.equal(input.length);
    });

    it("TC006: transforms objects", () => {
        const users = [
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 }
        ];
        const result = map(users, ({ name }) => name.toUpperCase());
        expect(result).to.deep.equal(['ALICE', 'BOB']);
    });

    it("TC007: error handling - non-function iteratee", () => {
        expect(() => map([1, 2], "not a function")).to.throw(TypeError);
        expect(() => map([1, 2], null)).to.throw(TypeError);
    });
});