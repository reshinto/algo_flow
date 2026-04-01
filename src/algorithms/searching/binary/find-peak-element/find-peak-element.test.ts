import { describe, it, expect } from "vitest";

import { findPeakElement } from "./sources/find-peak-element.ts?fn";

describe("findPeakElement", () => {
  it("finds the peak in the default example", () => {
    // [1, 3, 20, 4, 1, 0] — peak is 20 at index 2
    expect(findPeakElement([1, 3, 20, 4, 1, 0])).toBe(2);
  });

  it("finds the peak at the first element when array is strictly decreasing", () => {
    expect(findPeakElement([5, 4, 3, 2, 1])).toBe(0);
  });

  it("finds the peak at the last element when array is strictly increasing", () => {
    expect(findPeakElement([1, 2, 3, 4, 5])).toBe(4);
  });

  it("handles a single element array", () => {
    expect(findPeakElement([42])).toBe(0);
  });

  it("finds a peak in a two-element array — larger first", () => {
    expect(findPeakElement([10, 5])).toBe(0);
  });

  it("finds a peak in a two-element array — larger second", () => {
    expect(findPeakElement([5, 10])).toBe(1);
  });

  it("finds a valid peak when there are multiple peaks", () => {
    // [1, 5, 2, 7, 3] has peaks at index 1 (value 5) and index 3 (value 7)
    const peakIndex = findPeakElement([1, 5, 2, 7, 3]);
    const array = [1, 5, 2, 7, 3];
    const peakValue = array[peakIndex]!;
    // Verify the returned index is actually a peak (greater than neighbors)
    const leftNeighbor = peakIndex > 0 ? array[peakIndex - 1]! : -Infinity;
    const rightNeighbor = peakIndex < array.length - 1 ? array[peakIndex + 1]! : -Infinity;
    expect(peakValue).toBeGreaterThan(leftNeighbor);
    expect(peakValue).toBeGreaterThan(rightNeighbor);
  });

  it("finds a peak in a mountain-shaped array", () => {
    // [1, 2, 3, 5, 3, 2, 1] — peak is 5 at index 3
    expect(findPeakElement([1, 2, 3, 5, 3, 2, 1])).toBe(3);
  });

  it("finds the peak when it is at the start of a plateau then descent", () => {
    expect(findPeakElement([3, 2, 1])).toBe(0);
  });

  it("returns a valid peak index for a larger array", () => {
    const array = [10, 20, 15, 25, 5, 30, 8];
    const peakIndex = findPeakElement(array);
    const peakValue = array[peakIndex]!;
    const leftNeighbor = peakIndex > 0 ? array[peakIndex - 1]! : -Infinity;
    const rightNeighbor = peakIndex < array.length - 1 ? array[peakIndex + 1]! : -Infinity;
    expect(peakValue).toBeGreaterThan(leftNeighbor);
    expect(peakValue).toBeGreaterThan(rightNeighbor);
  });
});
