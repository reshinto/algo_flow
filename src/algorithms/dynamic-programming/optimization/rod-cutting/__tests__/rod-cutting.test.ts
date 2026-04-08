import { describe, it, expect } from "vitest";
import { rodCutting } from "../sources/rod-cutting.ts?fn";

describe("rodCutting", () => {
  it("returns 22 for default prices=[1,5,8,9,10,17,17,20] (four pieces of length 2)", () => {
    expect(rodCutting([1, 5, 8, 9, 10, 17, 17, 20])).toBe(22);
  });

  it("returns 5 for prices=[1,5] (one piece of length 2)", () => {
    expect(rodCutting([1, 5])).toBe(5);
  });

  it("returns 9 for prices=[3,5,8] (one piece of length 3)", () => {
    expect(rodCutting([3, 5, 8])).toBe(9);
  });

  it("returns 1 for prices=[1] (single piece of length 1)", () => {
    expect(rodCutting([1])).toBe(1);
  });

  it("returns 0 for empty prices array (zero-length rod)", () => {
    expect(rodCutting([])).toBe(0);
  });

  it("returns 10 for prices=[10] (single high-value piece)", () => {
    expect(rodCutting([10])).toBe(10);
  });

  it("returns correct value when cutting into all unit pieces is optimal", () => {
    // prices=[3,1,1]: length 1 = $3, length 2 = $1, length 3 = $1
    // best for length 3: three pieces of length 1 = 9
    expect(rodCutting([3, 1, 1])).toBe(9);
  });

  it("returns correct value when no cutting is optimal (take the whole rod)", () => {
    // prices=[1,2,10]: length 3 = $10, better than 1+2=3 or 1+1+1=3
    expect(rodCutting([1, 2, 10])).toBe(10);
  });

  it("handles uniform price list (all pieces same price per unit)", () => {
    // prices=[2,2,2]: best = 3 pieces of length 1 = 6
    expect(rodCutting([2, 2, 2])).toBe(6);
  });
});
