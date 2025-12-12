import { expect } from 'chai';
import reduce from "../src/reduce.js";

describe("Test cases for reduce.js", () => {
    // Array tests
    it("TC001: basic array sum with initial accumulator", () => {
        const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
        expect(result).to.equal(6);
    });

    it("TC002: array without initial accumulator (uses first element)", () => {
        const result = reduce([1, 2, 3], (prod, n) => prod * n);
        expect(result).to.equal(6);
    });

    it("TC003: empty array with initial accumulator", () => {
        const result = reduce([], (acc, x) => acc + x, 100);
        expect(result).to.equal(100);
    });

    it("TC004: empty array without accumulator → should use undefined behavior", () => {
        // Per lodash/JS spec: reduce([], fn) on empty array with no init → returns undefined
        const result = reduce([], (acc, x) => acc + x);
        expect(result).to.be.undefined;
    });

    it("TC005: iteratee receives (acc, value, index, collection) for arrays", () => {
        const arr = ['a', 'b'];
        let count = 0;
        reduce(arr, (acc, value, index, collection) => {
            expect(collection).to.equal(arr);
            expect(index).to.equal(count);
            count++;
            return acc;
        }, 0);
        expect(count).to.equal(2);
    });

    // Object tests
    it("TC006: reduce over object (accumulate keys by value)", () => {
        const obj = { a: 1, b: 2, c: 1 };
        const result = reduce(obj, (acc, value, key) => {
            if (!acc[value]) acc[value] = [];
            acc[value].push(key);
            return acc;
        }, {});
        // Note: key order isn’t guaranteed, so check structure
        expect(result).to.have.keys('1', '2');
        expect(result['1']).to.include.members(['a', 'c']);
        expect(result['2']).to.include.members(['b']);
    });

    it("TC007: empty object with initial value", () => {
        const result = reduce({}, (acc, val, key) => acc + 1, 5);
        expect(result).to.equal(5);
    });

    // Edge & error cases
    it("TC008: null or undefined collection", () => {
        expect(reduce(null, () => {}, 10)).to.equal(10);
        expect(reduce(undefined, () => {}, 10)).to.equal(10);
        expect(reduce(null, () => {})).to.be.undefined;
    });

    it("TC009: error handling – non-function iteratee", () => {
        expect(() => reduce([1, 2], "not a function", 0)).to.throw(TypeError);
    });

    it("TC010: early return (transform-style usage)", () => {
        // Mimics common pattern like building a lookup
        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        const lookup = reduce(users, (acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});
        expect(lookup).to.deep.equal({ 1: 'Alice', 2: 'Bob' });
    });
});