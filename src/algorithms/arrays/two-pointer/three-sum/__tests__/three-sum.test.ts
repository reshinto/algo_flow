import { describe, it, expect } from "vitest";
import { threeSum } from "../sources/three-sum.ts?fn";

describe("threeSum", () => {
  it("finds the two unique triplets in the default input", () => {
    const result: number[][] = threeSum([-1, 0, 1, 2, -1, -4]);
    /* Sorted result: [[-1,-1,2], [-1,0,1]] */
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([-1, -1, 2]);
    expect(result).toContainEqual([-1, 0, 1]);
  });

  it("returns empty array when no triplets exist", () => {
    const result: number[][] = threeSum([1, 2, 3]);
    expect(result).toEqual([]);
  });

  it("finds the single all-zero triplet", () => {
    const result: number[][] = threeSum([0, 0, 0]);
    expect(result).toEqual([[0, 0, 0]]);
  });

  it("returns empty array for a single element", () => {
    const result: number[][] = threeSum([1]);
    expect(result).toEqual([]);
  });

  it("returns empty array for two elements", () => {
    const result: number[][] = threeSum([1, -1]);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    const result: number[][] = threeSum([]);
    expect(result).toEqual([]);
  });

  it("produces no duplicate triplets when input has many duplicates", () => {
    /* [0,0,0,0] contains many zero-triples but only one unique triplet */
    const result: number[][] = threeSum([0, 0, 0, 0]);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual([0, 0, 0]);
  });

  it("matches expected output for the algorithm default input", () => {
    const result: number[][] = threeSum([-1, 0, 1, 2, -1, -4]);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([-1, -1, 2]);
    expect(result).toContainEqual([-1, 0, 1]);
  });
});
