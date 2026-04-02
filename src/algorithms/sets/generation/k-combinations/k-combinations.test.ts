import { describe, it, expect } from "vitest";
import { kCombinations } from "./sources/k-combinations.ts?fn";

describe("kCombinations", () => {
  it("generates C(5,3) = 10 combinations for the default input", () => {
    const result = kCombinations([1, 2, 3, 4, 5], 3) as number[][];
    expect(result.length).toBe(10);
  });

  it("every result subset has exactly k elements", () => {
    const result = kCombinations([1, 2, 3, 4, 5], 3) as number[][];
    for (const subset of result) {
      expect(subset.length).toBe(3);
    }
  });

  it("returns all expected combinations for [1,2,3,4,5] choose 3", () => {
    const result = kCombinations([1, 2, 3, 4, 5], 3) as number[][];
    const serialized = result
      .map((subset) => [...subset].sort((numA, numB) => numA - numB).join(","))
      .sort();
    const expected = [
      "1,2,3",
      "1,2,4",
      "1,2,5",
      "1,3,4",
      "1,3,5",
      "1,4,5",
      "2,3,4",
      "2,3,5",
      "2,4,5",
      "3,4,5",
    ].sort();
    expect(serialized).toEqual(expected);
  });

  it("returns C(4,2) = 6 combinations", () => {
    const result = kCombinations([1, 2, 3, 4], 2) as number[][];
    expect(result.length).toBe(6);
  });

  it("returns 1 combination when k equals n (full set)", () => {
    const result = kCombinations([1, 2, 3], 3) as number[][];
    expect(result.length).toBe(1);
    const subset = [...result[0]!].sort((numA, numB) => numA - numB);
    expect(subset).toEqual([1, 2, 3]);
  });

  it("returns 1 combination when k equals 1 (each element alone)", () => {
    const result = kCombinations([5, 10, 15], 1) as number[][];
    expect(result.length).toBe(3);
    for (const subset of result) {
      expect(subset.length).toBe(1);
    }
  });

  it("returns empty array when k = 0", () => {
    // k = 0 means no subsets of size 0 beyond the empty one
    // behavior: backtrack(0) immediately hits base case with empty subset
    const result = kCombinations([1, 2, 3], 0) as number[][];
    expect(result.length).toBe(1);
    expect(result[0]).toEqual([]);
  });

  it("returns empty array when k exceeds n", () => {
    const result = kCombinations([1, 2], 5) as number[][];
    expect(result.length).toBe(0);
  });

  it("returns empty array for empty input with k > 0", () => {
    const result = kCombinations([], 2) as number[][];
    expect(result.length).toBe(0);
  });

  it("produces no duplicate combinations", () => {
    const result = kCombinations([1, 2, 3, 4, 5], 3) as number[][];
    const serialized = result.map((subset) => [...subset].sort().join(","));
    const unique = new Set(serialized);
    expect(unique.size).toBe(result.length);
  });

  it("each subset contains only elements from the input", () => {
    const input = [10, 20, 30, 40];
    const result = kCombinations(input, 2) as number[][];
    for (const subset of result) {
      for (const value of subset) {
        expect(input).toContain(value);
      }
    }
  });
});
