import { describe, it, expect } from "vitest";
import { sleepSort } from "../sources/sleep-sort.ts?fn";

describe("sleepSort", () => {
  it("sorts an unsorted array", () => {
    expect(sleepSort([5, 3, 8, 1, 4, 2, 7, 6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("handles an already sorted array", () => {
    expect(sleepSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a reverse-sorted array", () => {
    expect(sleepSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles an array with duplicate values", () => {
    expect(sleepSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it("handles a single element array", () => {
    expect(sleepSort([42])).toEqual([42]);
  });

  it("handles an empty array", () => {
    expect(sleepSort([])).toEqual([]);
  });

  it("does not mutate the original array", () => {
    const original = [3, 1, 2];
    const sorted = sleepSort(original);
    expect(sorted).toEqual([1, 2, 3]);
    expect(original).toEqual([3, 1, 2]);
  });
});
