
import { expect } from 'chai';
import add from '../src/add.js';

// Generated with M365 Copilot
describe('add() — AI generated test suite', () => {
  // 1. Basic addition
  describe('1. Basic addition', () => {
    it('1.1 — adds positive integers', () => {
      expect(add(6, 4)).to.equal(10); // example
      expect(add(0, 0)).to.equal(0);
      expect(add(1, 0)).to.equal(1);
      expect(add(123, 456)).to.equal(579);
    });

    it('1.2 — handles negatives and zero', () => {
      expect(add(-1, -2)).to.equal(-3);
      expect(add(-5, 5)).to.equal(0);
      expect(add(0, -5)).to.equal(-5);
    });

    it('1.3 — handles floating-point numbers (closeTo)', () => {
      expect(add(0.1, 0.2)).to.be.closeTo(0.3, 1e-12);
      expect(add(2.675, 0.005)).to.be.closeTo(2.68, 1e-12);
      expect(add(1.005, 0.005)).to.be.closeTo(1.01, 1e-12);
    });
  });

  // 2. Defaulting and single-argument behavior
  describe('2. Defaulting and single-argument behavior', () => {
    it('2.1 — augend only: add(x) uses default 0 for missing addend', () => {
      expect(add(5)).to.equal(5);
      expect(add(-3)).to.equal(-3);
      expect(add(0)).to.equal(0);
    });

    it('2.2 — undefined is treated as 0 (default value)', () => {
      expect(add(undefined, undefined)).to.equal(0);
      expect(add(undefined, 7)).to.equal(7);
      expect(add(7, undefined)).to.equal(7);
    });

    it('2.3 — null is coerced to 0', () => {
      expect(add(null, 5)).to.equal(5);
      expect(add(5, null)).to.equal(5);
      expect(add(null, null)).to.equal(0);
    });
  });

  // 3. Type coercion
  describe('3. Type coercion', () => {
    it('3.1 — numeric strings are coerced to numbers', () => {
      expect(add('6', '4')).to.equal(10);
      expect(add('2.5', '0.5')).to.be.closeTo(3.0, 1e-12);
      expect(add('  10  ', '  5')).to.equal(15);
      expect(add('-3', '7')).to.equal(4);
    });

    it('3.2 — booleans are coerced (true->1, false->0)', () => {
      expect(add(true, true)).to.equal(2);
      expect(add(true, false)).to.equal(1);
      expect(add(false, false)).to.equal(0);
      expect(add(10, true)).to.equal(11);
    });

    it('3.3 — Date objects are coerced to their timestamp', () => {
      const d = new Date('2000-01-01T00:00:00Z');
      // Date coerces to ms since epoch; combined with 0 yields its numeric value
      expect(add(d, 0)).to.equal(+d);
      // Sum of two dates equals sum of timestamps
      const d2 = new Date('2000-01-02T00:00:00Z');
      expect(add(d, d2)).to.equal(+d + +d2);
    });

    it('3.4 — Arrays coerced via Number ([], [value])', () => {
      expect(add([], [])).to.equal(0);        // Number([]) === 0
      expect(add([1], [2])).to.equal(3);      // Number([1]) === 1
      expect(add([1], 2)).to.equal(3);
      expect(add(2, [3])).to.equal(5);
      // Multi-element arrays -> NaN
      expect(add([1, 2], 3)).to.be.NaN;
    });

    it('3.5 — Objects using valueOf', () => {
      const a = { valueOf: () => 7 };
      const b = { valueOf: () => 5 };
      expect(add(a, b)).to.equal(12);
      expect(add(a, 3)).to.equal(10);
      expect(add(3, b)).to.equal(8);
    });

    it('3.6 — Non-numeric strings produce NaN', () => {
      expect(add('foo', 1)).to.be.NaN;
      expect(add(1, 'foo')).to.be.NaN;
      expect(add('foo', 'bar')).to.be.NaN;
    });

    it('3.7 — Symbols produce NaN', () => {
      const s = Symbol('x');
      expect(add(s, 1)).to.be.NaN;
      expect(add(1, s)).to.be.NaN;
      expect(add(s, s)).to.be.NaN;
    });
  });

  // 4. Special numeric values
  describe('4. Special numeric values', () => {
    it('4.1 — NaN propagates', () => {
      expect(add(NaN, 1)).to.be.NaN;
      expect(add(1, NaN)).to.be.NaN;
      expect(add(NaN, NaN)).to.be.NaN;
    });

    it('4.2 — Infinity and -Infinity', () => {
      expect(add(Infinity, 1)).to.equal(Infinity);
      expect(add(-Infinity, -1)).to.equal(-Infinity);
      expect(add(Infinity, -Infinity)).to.be.NaN; // IEEE-754: indeterminate
      expect(add(Infinity, Infinity)).to.equal(Infinity);
      expect(add(-Infinity, -Infinity)).to.equal(-Infinity);
    });

    it('4.3 — preserves signed zero on additive identity', () => {
      // +0 + +0 => +0, -0 + +0 => -0, etc.
      const posZero = +0;
      const negZero = -0;
      expect(add(posZero, posZero)).to.satisfy(v => Object.is(v, +0));
      expect(add(negZero, posZero)).to.satisfy(v => Object.is(v, -0));
      expect(add(posZero, negZero)).to.satisfy(v => Object.is(v, -0));
      expect(add(negZero, negZero)).to.satisfy(v => Object.is(v, -0));
    });
  });

  // 5. BigInt (if createMathOperation coerces via Number)
  describe('5. BigInt', () => {
    it('5.1 — BigInt values are coerced to Number if supported', () => {
      // In modern JS, Number(1n) === 1; addition performed as Number
      expect(add(1n, 2)).to.equal(3);
      expect(add(2, 3n)).to.equal(5);
      expect(add(1n, 2n)).to.equal(3);
    });
  });

  // 6. Algebraic properties
  describe('6. Algebraic properties', () => {
    it('6.1 — commutativity: add(a, b) === add(b, a)', () => {
      const pairs = [
        [1, 2],
        [0.1, 0.2],
        [-3, 7],
        [Infinity, 1],
      ];
      pairs.forEach(([a, b]) => {
        const r1 = add(a, b);
        const r2 = add(b, a);
        if (Number.isFinite(r1) && Number.isFinite(r2)) {
          expect(r1).to.be.closeTo(r2, 1e-12);
        } else if (Number.isNaN(r1) || Number.isNaN(r2)) {
          expect(r1).to.be.NaN;
          expect(r2).to.be.NaN;
        } else {
          expect(Object.is(r1, r2)).to.equal(true);
        }
      });
    });

    it('6.2 — associativity (approximate for floats): add(add(a,b),c) ≈ add(a,add(b,c))', () => {
      const triples = [
        [0.1, 0.2, 0.3],
        [1.005, 0.005, 2.675],
        [-10, 5, 2.5],
      ];
      triples.forEach(([a, b, c]) => {
        const left = add(add(a, b), c);
        const right = add(a, add(b, c));
        if (Number.isFinite(left) && Number.isFinite(right)) {
          expect(left).to.be.closeTo(right, 1e-12);
        } else if (Number.isNaN(left) || Number.isNaN(right)) {
          expect(left).to.be.NaN;
          expect(right).to.be.NaN;
        } else {
          expect(Object.is(left, right)).to.equal(true);
        }
      });
    });

    it('6.3 — identity: add(x, 0) === x and add(0, x) === x (preserving -0)', () => {
      const samples = [ -0, 0, 1, -1, 2.5, -3.75, Infinity, -Infinity ];
      samples.forEach(x => {
        const r1 = add(x, 0);
        const r2 = add(0, x);
        if (Object.is(x, -0)) {
          expect(r1).to.satisfy(v => Object.is(v, -0));
          expect(r2).to.satisfy(v => Object.is(v, -0));
        } else if (Number.isFinite(x)) {
          expect(r1).to.be.closeTo(x, 1e-12);
          expect(r2).to.be.closeTo(x, 1e-12);
        } else {
          // Infinity cases
          expect(Object.is(r1, x)).to.equal(true);
          expect(Object.is(r2, x)).to.equal(true);
        }
      });
    });
  });

  // 7. Error-tolerant inputs
  describe('7. Error-tolerant inputs', () => {
    it('7.1 — empty arguments default to 0', () => {
      // add() => default + default => 0
      // This relies on createMathOperation defaultValue behavior
      expect(add()).to.equal(0);
    });

    it('7.2 — whitespace-only strings are coerced to 0', () => {
      expect(add('   ', '   ')).to.equal(0);
      expect(add('   ', 5)).to.equal(5);
      expect(add(5, '   ')).to.equal(5);
    });

    it('7.3 — objects without valueOf/toString yield NaN', () => {
      const obj = Object.create(null);
      // No toString/valueOf — Number(obj) is NaN
      expect(add(obj, 1)).to.be.NaN;
      expect(add(1, obj)).to.be.NaN;
    });
  });
});