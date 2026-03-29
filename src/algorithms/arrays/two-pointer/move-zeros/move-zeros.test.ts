import { describe, it, expect } from "vitest";
import { moveZeros } from "./sources/move-zeros.ts?fn";

describe("moveZeros", () => {
  it("moves zeros to end while preserving non-zero order", () => {
    /* [0,1,0,3,12]: zeros at indices 0,2 move to end; non-zeros [1,3,12] stay in order */
    const result = moveZeros([0, 1, 0, 3, 12]);
    expect(result).toEqual([1, 3, 12, 0, 0]);
  });

  it("returns unchanged array when there are no zeros", () => {
    const result = moveZeros([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns unchanged array when all elements are zero", () => {
    const result = moveZeros([0, 0, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("handles single zero element", () => {
    const result = moveZeros([0]);
    expect(result).toEqual([0]);
  });

  it("handles single non-zero element", () => {
    const result = moveZeros([7]);
    expect(result).toEqual([7]);
  });

  it("handles empty array", () => {
    const result = moveZeros([]);
    expect(result).toEqual([]);
  });

  it("handles all identical non-zero values", () => {
    const result = moveZeros([4, 4, 4, 4]);
    expect(result).toEqual([4, 4, 4, 4]);
  });

  it("places zeros at the very end when they appear at the start", () => {
    const result = moveZeros([0, 0, 1, 2]);
    expect(result).toEqual([1, 2, 0, 0]);
  });

  it("handles zeros already at the end", () => {
    const result = moveZeros([1, 2, 3, 0, 0]);
    expect(result).toEqual([1, 2, 3, 0, 0]);
  });

  it("handles the default input from the algorithm definition", () => {
    /* [0,1,0,3,12,0,5]: non-zeros are [1,3,12,5] → [1,3,12,5,0,0,0] */
    const result = moveZeros([0, 1, 0, 3, 12, 0, 5]);
    expect(result).toEqual([1, 3, 12, 5, 0, 0, 0]);
  });
});
