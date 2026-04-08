import { describe, it, expect } from "vitest";
import { setPermutations } from "../sources/set-permutations.ts?fn";

describe("setPermutations", () => {
  it("generates all 6 permutations for [1, 2, 3]", () => {
    const result = setPermutations([1, 2, 3]) as number[][];
    expect(result).toHaveLength(6);
  });

  it("contains every expected permutation of [1, 2, 3]", () => {
    const result = setPermutations([1, 2, 3]) as number[][];
    const sorted = result.map((perm) => perm.join(",")).sort();
    expect(sorted).toEqual(["1,2,3", "1,3,2", "2,1,3", "2,3,1", "3,1,2", "3,2,1"]);
  });

  it("generates 2 permutations for [1, 2]", () => {
    const result = setPermutations([1, 2]) as number[][];
    expect(result).toHaveLength(2);
    const sorted = result.map((perm) => perm.join(",")).sort();
    expect(sorted).toEqual(["1,2", "2,1"]);
  });

  it("generates exactly 1 permutation for a single element", () => {
    const result = setPermutations([42]) as number[][];
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([42]);
  });

  it("generates 1 permutation for an empty array", () => {
    const result = setPermutations([]) as number[][];
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([]);
  });

  it("each permutation has the same length as the input", () => {
    const result = setPermutations([1, 2, 3]) as number[][];
    for (const perm of result) {
      expect(perm).toHaveLength(3);
    }
  });

  it("each permutation contains all original elements", () => {
    const result = setPermutations([1, 2, 3]) as number[][];
    for (const perm of result) {
      expect(perm.sort()).toEqual([1, 2, 3]);
    }
  });

  it("generates 24 permutations for [1, 2, 3, 4]", () => {
    const result = setPermutations([1, 2, 3, 4]) as number[][];
    expect(result).toHaveLength(24);
  });

  it("all permutations are distinct", () => {
    const result = setPermutations([1, 2, 3]) as number[][];
    const stringified = result.map((perm) => perm.join(","));
    const unique = new Set(stringified);
    expect(unique.size).toBe(result.length);
  });
});
