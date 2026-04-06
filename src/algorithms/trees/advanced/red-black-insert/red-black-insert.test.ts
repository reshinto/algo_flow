import { describe, it, expect } from "vitest";
import { redBlackInsert } from "./sources/red-black-insert.ts?fn";

describe("redBlackInsert", () => {
  it("inserts a single value", () => {
    expect(redBlackInsert([5])).toEqual([5]);
  });

  it("produces sorted inorder output for default input", () => {
    const values = [7, 3, 18, 10, 22, 8, 11, 26];
    const result = redBlackInsert(values) as number[];
    expect(result).toEqual([...values].sort((numA, numB) => numA - numB));
  });

  it("handles ascending order insert", () => {
    const result = redBlackInsert([1, 2, 3, 4, 5]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles descending order insert", () => {
    const result = redBlackInsert([5, 4, 3, 2, 1]) as number[];
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns empty array for empty input", () => {
    expect(redBlackInsert([])).toEqual([]);
  });

  it("handles duplicate values gracefully", () => {
    const result = redBlackInsert([5, 3, 5]) as number[];
    expect(result.length).toBeGreaterThan(0);
  });
});
