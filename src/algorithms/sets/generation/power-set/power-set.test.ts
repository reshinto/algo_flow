import { describe, it, expect } from "vitest";
import { powerSet } from "./sources/power-set.ts?fn";

describe("powerSet", () => {
  it("generates all 2^n subsets for the default input", () => {
    const result = powerSet([1, 2, 3, 4]) as number[][];
    expect(result.length).toBe(16);
  });

  it("includes the empty set", () => {
    const result = powerSet([1, 2, 3]) as number[][];
    const hasEmpty = result.some((subset) => subset.length === 0);
    expect(hasEmpty).toBe(true);
  });

  it("includes the full set", () => {
    const result = powerSet([1, 2, 3]) as number[][];
    const hasFull = result.some(
      (subset) =>
        subset.length === 3 && subset.includes(1) && subset.includes(2) && subset.includes(3),
    );
    expect(hasFull).toBe(true);
  });

  it("returns 1 subset for empty input (the empty set)", () => {
    const result = powerSet([]) as number[][];
    expect(result.length).toBe(1);
    expect(result[0]).toEqual([]);
  });

  it("returns 2 subsets for a single element", () => {
    const result = powerSet([7]) as number[][];
    expect(result.length).toBe(2);
  });

  it("returns 4 subsets for two elements", () => {
    const result = powerSet([1, 2]) as number[][];
    expect(result.length).toBe(4);
  });

  it("returns 8 subsets for three elements", () => {
    const result = powerSet([1, 2, 3]) as number[][];
    expect(result.length).toBe(8);
  });

  it("contains all expected subsets for [1, 2, 3]", () => {
    const result = powerSet([1, 2, 3]) as number[][];
    const sortedResult = result
      .map((subset) => [...subset].sort((numA, numB) => numA - numB))
      .sort((subsetA, subsetB) => subsetA.join(",").localeCompare(subsetB.join(",")));

    const expected = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]];
    const sortedExpected = expected.sort((subsetA, subsetB) =>
      subsetA.join(",").localeCompare(subsetB.join(",")),
    );

    expect(sortedResult).toEqual(sortedExpected);
  });

  it("produces no duplicate subsets", () => {
    const result = powerSet([1, 2, 3, 4]) as number[][];
    const serialized = result.map((subset) => [...subset].sort().join(","));
    const unique = new Set(serialized);
    expect(unique.size).toBe(result.length);
  });

  it("each subset contains only elements from the input", () => {
    const input = [5, 10, 15];
    const result = powerSet(input) as number[][];
    for (const subset of result) {
      for (const value of subset) {
        expect(input).toContain(value);
      }
    }
  });
});
