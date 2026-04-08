import { describe, it, expect } from "vitest";
import { twoSum } from "../sources/two-sum.ts?fn";

describe("twoSum", () => {
  it("finds the pair that sums to the target in the default example", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("finds a pair at the end of the array", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("finds a pair using the same index only once (no duplicate use)", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it("returns the first valid pair when multiple exist", () => {
    const result = twoSum([1, 2, 3, 4, 5], 5);
    const [firstIdx, secondIdx] = result as [number, number];
    expect(firstIdx).toBeGreaterThanOrEqual(0);
    expect(secondIdx).toBeGreaterThan(firstIdx);
  });

  it("handles negative numbers", () => {
    expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
  });

  it("handles zero as a target", () => {
    expect(twoSum([-1, 0, 1, 2], 0)).toEqual([0, 2]);
  });

  it("finds pair at the beginning of the array", () => {
    expect(twoSum([5, 3, 1, 9], 8)).toEqual([0, 1]);
  });

  it("handles a two-element array matching the target", () => {
    expect(twoSum([4, 6], 10)).toEqual([0, 1]);
  });
});
