import { describe, it, expect } from "vitest";
import { firstMissingPositive } from "../sources/first-missing-positive.ts?fn";

describe("firstMissingPositive", () => {
  it("returns 6 for the default input [3, 4, -1, 1, 7, 5, 2]", () => {
    /* Values present: 1, 2, 3, 4, 5, 7 — missing: 6 */
    const result = firstMissingPositive([3, 4, -1, 1, 7, 5, 2]);
    expect(result.missingPositive).toBe(6);
  });

  it("returns 3 when 1 and 2 are present but 3 is missing", () => {
    const result = firstMissingPositive([1, 2, 0]);
    expect(result.missingPositive).toBe(3);
  });

  it("returns 2 when array is [3, 4, -1, 1]", () => {
    const result = firstMissingPositive([3, 4, -1, 1]);
    expect(result.missingPositive).toBe(2);
  });

  it("returns 1 when array contains only large positive values", () => {
    const result = firstMissingPositive([7, 8, 9, 11, 12]);
    expect(result.missingPositive).toBe(1);
  });

  it("returns 1 for an empty array", () => {
    const result = firstMissingPositive([]);
    expect(result.missingPositive).toBe(1);
  });

  it("returns n+1 when array is [1, 2, 3, 4, 5]", () => {
    const result = firstMissingPositive([1, 2, 3, 4, 5]);
    expect(result.missingPositive).toBe(6);
  });

  it("handles array with all negative numbers", () => {
    const result = firstMissingPositive([-1, -2, -3]);
    expect(result.missingPositive).toBe(1);
  });

  it("handles a single-element array containing 1", () => {
    const result = firstMissingPositive([1]);
    expect(result.missingPositive).toBe(2);
  });

  it("handles a single-element array containing 2", () => {
    const result = firstMissingPositive([2]);
    expect(result.missingPositive).toBe(1);
  });

  it("handles duplicate values in the array", () => {
    const result = firstMissingPositive([1, 1, 2, 2]);
    expect(result.missingPositive).toBe(3);
  });

  it("does not mutate the original array", () => {
    const original = [3, 4, -1, 1, 7, 5, 2];
    const snapshot = [...original];
    firstMissingPositive(original);
    expect(original).toEqual(snapshot);
  });
});
