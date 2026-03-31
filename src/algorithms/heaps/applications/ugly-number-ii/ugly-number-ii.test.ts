import { describe, it, expect } from "vitest";
import { uglyNumberIi } from "./sources/ugly-number-ii.ts?fn";

/** The first 15 ugly numbers for reference verification. */
const UGLY_SEQUENCE = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 18, 20, 24];

describe("uglyNumberIi", () => {
  it("returns 12 for the default input (n=10)", () => {
    expect(uglyNumberIi(10)).toBe(12);
  });

  it("returns 1 for n=1 (first ugly number)", () => {
    expect(uglyNumberIi(1)).toBe(1);
  });

  it("returns 2 for n=2", () => {
    expect(uglyNumberIi(2)).toBe(2);
  });

  it("returns 6 for n=6", () => {
    expect(uglyNumberIi(6)).toBe(6);
  });

  it("matches the known sequence for n=1 through n=15", () => {
    for (let position = 1; position <= UGLY_SEQUENCE.length; position++) {
      expect(uglyNumberIi(position)).toBe(UGLY_SEQUENCE[position - 1]);
    }
  });

  it("returns a number whose only prime factors are 2, 3, or 5", () => {
    const result = uglyNumberIi(10) as number;
    let remaining = result;
    for (const factor of [2, 3, 5]) {
      while (remaining % factor === 0) {
        remaining = remaining / factor;
      }
    }
    expect(remaining).toBe(1);
  });

  it("returns a larger known ugly number for n=15", () => {
    expect(uglyNumberIi(15)).toBe(24);
  });
});
