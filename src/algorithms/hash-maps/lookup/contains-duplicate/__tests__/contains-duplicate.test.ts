import { describe, it, expect } from "vitest";
import { containsDuplicate } from "../sources/contains-duplicate.ts?fn";

describe("containsDuplicate", () => {
  it("returns true for the default input with a repeated value", () => {
    expect(containsDuplicate([1, 2, 3, 1])).toBe(true);
  });

  it("returns false when all values are unique", () => {
    expect(containsDuplicate([1, 2, 3, 4])).toBe(false);
  });

  it("returns false for a single-element array", () => {
    expect(containsDuplicate([42])).toBe(false);
  });

  it("returns false for an empty array", () => {
    expect(containsDuplicate([])).toBe(false);
  });

  it("returns true when the first two elements are equal", () => {
    expect(containsDuplicate([5, 5, 6, 7])).toBe(true);
  });

  it("returns true when the duplicate appears at the very end", () => {
    expect(containsDuplicate([1, 2, 3, 4, 5, 1])).toBe(true);
  });

  it("returns true when all elements are the same", () => {
    expect(containsDuplicate([7, 7, 7, 7])).toBe(true);
  });

  it("handles negative numbers", () => {
    expect(containsDuplicate([-1, -2, -3, -1])).toBe(true);
  });

  it("returns false when negatives are all distinct", () => {
    expect(containsDuplicate([-3, -2, -1, 0])).toBe(false);
  });

  it("handles a large array with no duplicates", () => {
    const uniqueNumbers = Array.from({ length: 100 }, (_, idx) => idx);
    expect(containsDuplicate(uniqueNumbers)).toBe(false);
  });
});
