import { describe, it, expect } from "vitest";
import { fourSum } from "../sources/four-sum.ts?fn";

describe("fourSum", () => {
  it("finds three unique quadruplets for the default input with target 0", () => {
    const result: number[][] = fourSum([1, 0, -1, 0, -2, 2], 0);
    expect(result).toHaveLength(3);
    expect(result).toContainEqual([-2, -1, 1, 2]);
    expect(result).toContainEqual([-2, 0, 0, 2]);
    expect(result).toContainEqual([-1, 0, 0, 1]);
  });

  it("returns empty array when no quadruplets exist", () => {
    const result: number[][] = fourSum([1, 2, 3, 4], 100);
    expect(result).toEqual([]);
  });

  it("finds a single all-zero quadruplet", () => {
    const result: number[][] = fourSum([0, 0, 0, 0], 0);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual([0, 0, 0, 0]);
  });

  it("returns empty array for fewer than four elements", () => {
    const result: number[][] = fourSum([1, 2, 3], 6);
    expect(result).toEqual([]);
  });

  it("returns empty array for empty input", () => {
    const result: number[][] = fourSum([], 0);
    expect(result).toEqual([]);
  });

  it("produces no duplicate quadruplets when input has many duplicates", () => {
    /* [0,0,0,0,0] has only one unique zero-sum quadruplet */
    const result: number[][] = fourSum([0, 0, 0, 0, 0], 0);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual([0, 0, 0, 0]);
  });

  it("handles negative target", () => {
    const result: number[][] = fourSum([1, -2, -5, -4, -3, 3, 3, 5], -11);
    expect(result.length).toBeGreaterThan(0);
    for (const quad of result) {
      const quadSum = quad.reduce((acc, val) => acc + val, 0);
      expect(quadSum).toBe(-11);
    }
  });

  it("handles positive target larger than zero", () => {
    const result: number[][] = fourSum([1, 0, -1, 0, -2, 2], 1);
    for (const quad of result) {
      const quadSum = quad.reduce((acc, val) => acc + val, 0);
      expect(quadSum).toBe(1);
    }
  });

  it("all found quadruplets sum to the target", () => {
    const target = 0;
    const result: number[][] = fourSum([2, 2, 2, 2, 2], target);
    for (const quad of result) {
      const quadSum = quad.reduce((acc, val) => acc + val, 0);
      expect(quadSum).toBe(target);
    }
  });
});
