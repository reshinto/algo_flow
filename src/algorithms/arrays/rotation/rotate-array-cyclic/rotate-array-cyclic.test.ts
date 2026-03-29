import { describe, it, expect } from "vitest";
import { rotateArrayCyclic } from "./sources/rotate-array-cyclic.ts?fn";

describe("rotateArrayCyclic", () => {
  it("rotates an array by 2 positions using cyclic replacement", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it("rotates by 1 position", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4, 5], 1);
    expect(result).toEqual([5, 1, 2, 3, 4]);
  });

  it("rotates by k equal to array length returns original", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4], 4);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("handles rotate count larger than array length via modulo", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4, 5, 6], 8);
    /* 8 % 6 = 2, same as rotating by 2 */
    expect(result).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it("handles rotate count of 0", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4], 0);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  it("handles an empty array", () => {
    const result = rotateArrayCyclic([], 3);
    expect(result).toEqual([]);
  });

  it("handles a single-element array", () => {
    const result = rotateArrayCyclic([42], 5);
    expect(result).toEqual([42]);
  });

  it("handles an array of two elements", () => {
    const result = rotateArrayCyclic([1, 2], 1);
    expect(result).toEqual([2, 1]);
  });

  it("produces correct result for the default algorithm input", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4, 5, 6], 2);
    expect(result).toEqual([5, 6, 1, 2, 3, 4]);
  });

  it("does not mutate the original array", () => {
    const original = [1, 2, 3, 4, 5];
    rotateArrayCyclic(original, 2);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles rotate count equal to 1 for a 6-element array (single long cycle)", () => {
    const result = rotateArrayCyclic([1, 2, 3, 4, 5, 6], 1);
    expect(result).toEqual([6, 1, 2, 3, 4, 5]);
  });
});
