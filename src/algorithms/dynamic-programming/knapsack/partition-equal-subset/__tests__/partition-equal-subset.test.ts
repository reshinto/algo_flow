import { describe, it, expect } from "vitest";
import { partitionEqualSubset } from "../sources/partition-equal-subset.ts?fn";

describe("partitionEqualSubset", () => {
  it("returns true for [1, 5, 11, 5] — subsets [1,5,5] and [11] each sum to 11", () => {
    expect(partitionEqualSubset([1, 5, 11, 5])).toBe(true);
  });

  it("returns false for [1, 2, 3, 5] — no equal partition exists", () => {
    expect(partitionEqualSubset([1, 2, 3, 5])).toBe(false);
  });

  it("returns true for [1, 1] — each element forms one subset", () => {
    expect(partitionEqualSubset([1, 1])).toBe(true);
  });

  it("returns false for [1] — single element cannot be split", () => {
    expect(partitionEqualSubset([1])).toBe(false);
  });

  it("returns false when total sum is odd", () => {
    expect(partitionEqualSubset([1, 2, 4])).toBe(false);
  });

  it("returns true for equal halves [3, 3, 3, 3]", () => {
    expect(partitionEqualSubset([3, 3, 3, 3])).toBe(true);
  });

  it("returns true for [2, 2, 1, 1]", () => {
    expect(partitionEqualSubset([2, 2, 1, 1])).toBe(true);
  });

  it("returns false when no subset can reach the target", () => {
    expect(partitionEqualSubset([1, 2, 5])).toBe(false);
  });
});
