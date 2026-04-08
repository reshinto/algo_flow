import { describe, it, expect } from "vitest";
import { maxSubarrayKadane } from "../sources/max-subarray-kadane.ts?fn";

describe("maxSubarrayKadane", () => {
  it("returns 6 for [-2, 1, -3, 4, -1, 2, 1, -5, 4]", () => {
    expect(maxSubarrayKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  it("returns 1 for a single positive element [1]", () => {
    expect(maxSubarrayKadane([1])).toBe(1);
  });

  it("returns -1 for a single negative element [-1]", () => {
    expect(maxSubarrayKadane([-1])).toBe(-1);
  });

  it("returns 23 for an all-positive array [5, 4, -1, 7, 8]", () => {
    expect(maxSubarrayKadane([5, 4, -1, 7, 8])).toBe(23);
  });

  it("returns -1 for an all-negative array [-3, -2, -1]", () => {
    expect(maxSubarrayKadane([-3, -2, -1])).toBe(-1);
  });
});
