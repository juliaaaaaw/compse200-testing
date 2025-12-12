import { expect } from 'chai';
import filter from "../src/filter.js";

describe("Test cases for filter.js", () => {
    // Basic functionality tests
    it("TC001: basic case - filter even numbers", () => {
        const array = [1, 2, 3, 4, 5, 6];
        const result = filter(array, (value) => value % 2 === 0);
        expect(result).to.deep.equal([2, 4, 6]);
    });

    it("TC002: filter returns empty array when no elements match", () => {
        const array = [1, 3, 5];
        const result = filter(array, (value) => value % 2 === 0);
        expect(result).to.deep.equal([]);
    });

    it("TC003: filter returns all elements when all match", () => {
        const array = [2, 4, 6];
        const result = filter(array, (value) => value % 2 === 0);
        expect(result).to.deep.equal([2, 4, 6]);
    });

    it("TC004: filter with objects - basic object filtering", () => {
        const users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred', 'active': false }
        ];
        const result = filter(users, ({ active }) => active);
        expect(result).to.deep.equal([{ 'user': 'barney', 'active': true }]);
    });

    // Predicate function argument tests
    it("TC005: predicate receives correct value, index, and array", () => {
        const array = ['a', 'b', 'c'];
        let callCount = 0;
        
        filter(array, (value, index, arr) => {
            expect(value).to.equal(array[index]);
            expect(arr).to.equal(array);
            callCount++;
            return true;
        });
        
        expect(callCount).to.equal(3);
    });

    it("TC006: predicate with index - filter by index position", () => {
        const array = ['a', 'b', 'c', 'd'];
        const result = filter(array, (value, index) => index % 2 === 0);
        expect(result).to.deep.equal(['a', 'c']);
    });

    // Edge case tests
    it("TC007: empty array input", () => {
        const result = filter([], (value) => true);
        expect(result).to.deep.equal([]);
    });

    it("TC008: null or undefined array input", () => {
        expect(filter(null, () => true)).to.deep.equal([]);
        expect(filter(undefined, () => true)).to.deep.equal([]);
    });

    it("TC009: array with mixed types", () => {
        const array = [1, 'hello', true, null, 0, false];
        const result = filter(array, (value) => value);
        expect(result).to.deep.equal([1, 'hello', true]);
    });

    it("TC010: filter with falsy values that should be included", () => {
        const array = [0, 1, 2, 3];
        const result = filter(array, (value) => value === 0);
        expect(result).to.deep.equal([0]);
    });

    // Error handling tests
    it("TC011: should throw TypeError when predicate is not a function", () => {
        const array = [1, 2, 3];
        expect(() => filter(array, "not a function")).to.throw(TypeError);
        expect(() => filter(array, null)).to.throw(TypeError);
        expect(() => filter(array, undefined)).to.throw(TypeError);
    });

    it("TC012: should not modify original array", () => {
        const original = [1, 2, 3, 4];
        const originalCopy = [...original];
        filter(original, (value) => value > 2);
        expect(original).to.deep.equal(originalCopy);
    });
    
    it("TC013: should return new array with correct length", () => {
        const array = [1, 2, 3];
        const result1 = filter(array, () => false); 
        const result2 = filter(array, () => true); 
        
        expect(result1).to.deep.equal([]);
        expect(result1.length).to.equal(0);
        expect(result2).to.deep.equal([1, 2, 3]);
        expect(result2.length).to.equal(3);
    });
});