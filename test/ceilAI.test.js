
import { expect } from 'chai';
import ceil from '../src/ceil.js';

// Generated with M365 Copilot
describe('ceil() — AI generated test suite', () => {
  // 1. Basic rounding (precision = 0)
  describe('1. Basic rounding (precision = 0)', () => {
    it('1.1 — rounds up small positive decimals', () => {
      expect(ceil(0)).to.equal(0);
      expect(ceil(0.00001)).to.equal(1);
      expect(ceil(0.1)).to.equal(1);
      expect(ceil(1)).to.equal(1);
      expect(ceil(1.001)).to.equal(2);
      expect(ceil(4.006)).to.equal(5); // example
    });

    it('1.2 — returns integers unchanged', () => {
      expect(ceil(5)).to.equal(5);
      expect(ceil(100)).to.equal(100);
      expect(ceil(-2)).to.equal(-2);
    });

    it('1.3 — rounds negatives towards +∞', () => {
      expect(ceil(-0.00001)).to.equal(0);
      expect(ceil(-0.1)).to.equal(0);
      expect(ceil(-1.001)).to.equal(-1);
      expect(ceil(-4.006)).to.equal(-4);
      // sanity: bounds check for a small negative
      expect(ceil(-0.49)).to.be.within(0, 0);
    });

    it('1.4 — preserves -0 sign like Math.ceil', () => {
      const res = ceil(-0);
      // Use Chai's satisfy to assert the sign is preserved
      expect(res).to.satisfy(val => Object.is(val, -0));
    });

    it('1.5 — handles NaN and Infinity', () => {
      expect(ceil(NaN)).to.be.NaN;
      expect(ceil(Infinity)).to.equal(Infinity);
      expect(ceil(-Infinity)).to.equal(-Infinity);
    });
  });

  // 2. Positive precision (decimal places)
  describe('2. Positive precision (decimal places)', () => {
    it('2.1 — rounds up to given decimal places', () => {
      expect(ceil(6.004, 2)).to.equal(6.01); // example
      expect(ceil(6.0, 2)).to.equal(6.0);
      expect(ceil(5.999, 2)).to.equal(6.0);
      expect(ceil(1.234, 1)).to.equal(1.3);
      expect(ceil(1.2, 1)).to.equal(1.2);
    });


describe('2. Positive precision (decimal places)', () => {
  it('2.2 — handles floating-point edge cases (closeTo)', () => {
    expect(ceil(0.1 + 0.2, 2)).to.be.closeTo(0.31, 1e-12);
    expect(ceil(2.675, 2)).to.be.closeTo(2.68, 1e-12);
    expect(ceil(1.005, 2)).to.be.closeTo(1.01, 1e-12);
  });
});


    it('2.3 — supports scientific notation and tiny numbers', () => {
      expect(ceil(1e-7, 8)).to.equal(0.0000001); // 1e-7
      expect(ceil(1e-7, 7)).to.equal(0.0000001);
      expect(ceil(9.9999999e-7, 7)).to.be.closeTo(0.000001, 1e-12);
    });

    it('2.4 — precision coercion and defaults', () => {
      expect(ceil(1.234, undefined)).to.equal(2); // default 0
      expect(ceil(1.234, null)).to.equal(2);      // null -> 0
      expect(ceil(1.234, 0)).to.equal(2);
      expect(ceil(1.234, '2')).to.be.closeTo(1.24, 1e-12); // string -> 2
      expect(ceil(1.234, NaN)).to.equal(2);       // NaN -> 0
    });
  });

  // 3. Negative precision (tens/hundreds/etc.)
  describe('3. Negative precision (tens/hundreds/etc.)', () => {
    it('3.1 — rounds up to powers of ten', () => {
      expect(ceil(6040, -2)).to.equal(6100); // example
      expect(ceil(6001, -2)).to.equal(6100);
      expect(ceil(6100, -2)).to.equal(6100);
      expect(ceil(61, -1)).to.equal(70);
      expect(ceil(61, -2)).to.equal(100);
      expect(ceil(61, -3)).to.equal(1000);
    });

    it('3.2 — works with negative numbers', () => {
      expect(ceil(-6040, -2)).to.equal(-6000);
      expect(ceil(-6101, -2)).to.equal(-6100);
      expect(ceil(-999, -2)).to.equal(-900);
      expect(ceil(-101, -2)).to.equal(-100);
    });


describe('3. Negative precision (tens/hundreds/etc.)', () => {
  it('3.3 — large magnitudes', () => {
    expect(ceil(123456789, -5)).to.equal(123500000);
    expect(ceil(-123456789, -5)).to.equal(-123450000);
  });
});


    it('3.4 — precision extremes and coercion', () => {
      expect(ceil(123, -0)).to.equal(123);   // -0 treated as 0
      expect(ceil(123, '-2')).to.equal(200); // Number('-2') === -2 -> hundreds
      expect(ceil(149, -2)).to.equal(200);
      expect(ceil(100, -3)).to.equal(1000);
    });
  });

  // 4. Idempotence & monotonicity
  describe('4. Idempotence & monotonicity', () => {
    it('4.1 — idempotence: ceil(ceil(x)) === ceil(x) at precision 0', () => {
      const xs = [ -3.9, -3, -2.1, -0.001, 0, 0.001, 2.1, 3, 3.00001 ];
      xs.forEach(x => {
        expect(ceil(ceil(x))).to.equal(ceil(x));
      });
    });

    it('4.2 — monotonicity: if a ≤ b then ceil(a, p) ≤ ceil(b, p)', () => {
      const pairs = [
        [-1.2345, -1.2344],
        [0, 0.0000001],
        [1.2, 1.2000001],
        [999.99, 1000.0],
      ];
      pairs.forEach(([a, b]) => {
        for (const p of [ -3, -2, -1, 0, 1, 2, 6 ]) {
          expect(ceil(a, p)).to.be.at.most(ceil(b, p));
        }
      });
    });
  });

  // 5. Type coercion (number & precision)
  describe('5. Type coercion (number & precision)', () => {
    it('5.1 — coerces numeric strings', () => {
      expect(ceil('4.006')).to.equal(5);
      expect(ceil('6.004', 2)).to.be.closeTo(6.01, 1e-12);
      expect(ceil('6040', -2)).to.equal(6100);
    });

    it('5.2 — non-numeric strings result in NaN', () => {
      expect(ceil('not-a-number')).to.be.NaN;
    });

    it('5.3 — Number object is unboxed', () => {
      // eslint-disable-next-line no-new-wrappers
      const n = new Number(3.14);
      expect(ceil(n, 2)).to.be.closeTo(3.14, 1e-12);
      expect(ceil(n, 1)).to.be.closeTo(3.2, 1e-12);
    });
  });

  // 6. Consistency with Math.ceil when precision = 0
  describe('6. Consistency with Math.ceil when precision = 0', () => {
    it('6.1 — matches Math.ceil when precision is 0 or omitted', () => {
      const samples = [
        -10, -9.999, -3.4, -3.0, -2.00001, -0.0, -0.00001,
        0.0, 0.00001, 1, 1.000001, 2.5, 99.999, 100,
      ];
      samples.forEach(x => {
        // Preserve signed zero where applicable — check via satisfy
        expect(ceil(x)).to.satisfy(val => Object.is(val, Math.ceil(x)));
        expect(ceil(x, 0)).to.satisfy(val => Object.is(val, Math.ceil(x)));
        expect(ceil(x, undefined)).to.satisfy(val => Object.is(val, Math.ceil(x)));
        expect(ceil(x, null)).to.satisfy(val => Object.is(val, Math.ceil(x)));
      });
    });
  });

  // 7. Precision bounds
  describe('7. Precision bounds', () => {
    it('7.1 — very large positive precision is stable (closeTo)', () => {
      const r = ceil(1.00000000000001, 15);
      expect(r).to.be.closeTo(1.00000000000001, 1e-12);
    });

    it('7.2 — very large negative precision behaves reasonably', () => {
    const r = ceil(12345, -10);
    expect(r).to.equal(1e10);

    });
  });
});
