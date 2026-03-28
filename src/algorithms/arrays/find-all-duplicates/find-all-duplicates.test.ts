import { describe, it, expect } from "vitest";
import { findAllDuplicates } from "./sources/find-all-duplicates.ts?fn";

describe("findAllDuplicates", () => {
  it("finds duplicates in the default input", () => {
    const result = findAllDuplicates([4, 3, 2, 7, 8, 2, 3, 1]);
    /* 2 and 3 appear twice */
    expect(result.sort()).toEqual([2, 3]);
  });

  it("returns empty array when no duplicates exist", () => {
    const result = findAllDuplicates([1, 2, 3, 4, 5]);
    expect(result).toEqual([]);
  });

  it("finds a single duplicate", () => {
    const result = findAllDuplicates([1, 2, 3, 2]);
    expect(result).toEqual([2]);
  });

  it("finds multiple duplicates", () => {
    const result = findAllDuplicates([1, 1, 2, 2, 3, 3]);
    expect(result.sort()).toEqual([1, 2, 3]);
  });

  it("handles a single-element array with no duplicates", () => {
    const result = findAllDuplicates([1]);
    expect(result).toEqual([]);
  });

  it("handles an empty array", () => {
    const result = findAllDuplicates([]);
    expect(result).toEqual([]);
  });

  it("handles all elements appearing twice", () => {
    const result = findAllDuplicates([2, 1, 2, 1]);
    expect(result.sort()).toEqual([1, 2]);
  });

  it("finds duplicates when they appear at the end of the array", () => {
    const result = findAllDuplicates([1, 2, 3, 4, 5, 4]);
    expect(result).toEqual([4]);
  });

  it("does not mutate the caller-visible view of the input", () => {
    const original = [4, 3, 2, 7, 8, 2, 3, 1];
    const snapshot = [...original];
    findAllDuplicates(original);
    /* The function copies internally, so original should be unchanged */
    expect(original).toEqual(snapshot);
  });
});
