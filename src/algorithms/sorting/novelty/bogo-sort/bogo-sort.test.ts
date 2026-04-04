import { describe, it, expect } from "vitest";
import { bogoSort } from "./sources/bogo-sort.ts?fn";

describe("bogoSort", () => {
  it("sorts a small array using seeded PRNG", () => {
    const result = bogoSort([3, 1, 2]);
    expect(result).toEqual([1, 2, 3]);
  });

  it("handles an already sorted array", () => {
    expect(bogoSort([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("handles a single element array", () => {
    expect(bogoSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(bogoSort([])).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = bogoSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });

  it("produces a sorted result (within cap)", () => {
    const result = bogoSort([2, 1]);
    // Either sorted (if PRNG finds it within 100 iterations) or same array
    const isSorted = result[0]! <= result[1]!;
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    // With seed 42 and only 2 elements, it should sort quickly
    expect(isSorted).toBe(true);
  });
});
