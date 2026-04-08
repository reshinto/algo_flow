import { describe, it, expect } from "vitest";
import { containsDuplicateII } from "../sources/contains-duplicate-ii.ts?fn";

describe("containsDuplicateII", () => {
  it("returns true for the default input within maxDistance", () => {
    expect(containsDuplicateII([1, 2, 3, 1], 3)).toBe(true);
  });

  it("returns false when duplicate exists but is beyond maxDistance", () => {
    expect(containsDuplicateII([1, 2, 3, 1], 2)).toBe(false);
  });

  it("returns true when adjacent elements are equal and maxDistance is 1", () => {
    expect(containsDuplicateII([1, 1, 3, 4], 1)).toBe(true);
  });

  it("returns false for all unique values", () => {
    expect(containsDuplicateII([1, 2, 3, 4], 3)).toBe(false);
  });

  it("returns false for a single-element array", () => {
    expect(containsDuplicateII([42], 1)).toBe(false);
  });

  it("returns false for an empty array", () => {
    expect(containsDuplicateII([], 0)).toBe(false);
  });

  it("returns true when maxDistance equals the full array length", () => {
    expect(containsDuplicateII([1, 2, 3, 4, 1], 4)).toBe(true);
  });

  it("returns false when maxDistance is zero and no adjacent duplicates exist", () => {
    expect(containsDuplicateII([1, 2, 3, 4], 0)).toBe(false);
  });

  it("handles negative numbers within distance", () => {
    expect(containsDuplicateII([-1, 0, -1], 2)).toBe(true);
  });

  it("updates stored index when value reappears beyond distance and matches later", () => {
    // [1, 2, 1, 2] with maxDistance 1 — first 1s are 2 apart (too far), then 2s at indices 1 and 3 also 2 apart
    expect(containsDuplicateII([1, 2, 1, 2], 1)).toBe(false);
  });

  it("returns true when the updated index creates a qualifying pair", () => {
    // [1, 0, 1, 1] with maxDistance 1 — first pair at distance 2 (miss), second pair at distance 1 (hit)
    expect(containsDuplicateII([1, 0, 1, 1], 1)).toBe(true);
  });
});
