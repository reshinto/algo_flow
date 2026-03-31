import { describe, it, expect } from "vitest";
import { findMedianStream } from "./sources/find-median-stream.ts?fn";

describe("findMedianStream", () => {
  it("produces the correct running medians for the default stream", () => {
    const result = findMedianStream([5, 2, 8, 1, 9, 3, 7]);
    // After 5:        median = 5
    // After 5,2:      median = 3.5
    // After 5,2,8:    median = 5
    // After 5,2,8,1:  median = 3.5
    // After adding 9: median = 5
    // After adding 3: median = 4
    // After adding 7: median = 5
    expect(result).toEqual([5, 3.5, 5, 3.5, 5, 4, 5]);
  });

  it("handles a single-element stream", () => {
    const result = findMedianStream([42]);
    expect(result).toEqual([42]);
  });

  it("handles two elements — returns average for even count", () => {
    const result = findMedianStream([3, 7]);
    expect(result).toEqual([3, 5]);
  });

  it("handles all identical elements", () => {
    const result = findMedianStream([4, 4, 4, 4]);
    expect(result).toEqual([4, 4, 4, 4]);
  });

  it("handles an already-sorted ascending stream", () => {
    const result = findMedianStream([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 1.5, 2, 2.5, 3]);
  });

  it("handles a descending stream", () => {
    const result = findMedianStream([5, 4, 3, 2, 1]);
    expect(result).toEqual([5, 4.5, 4, 3.5, 3]);
  });

  it("handles negative numbers", () => {
    const result = findMedianStream([-5, -1, -3]);
    expect(result).toEqual([-5, -3, -3]);
  });

  it("handles a mix of negative and positive numbers", () => {
    const result = findMedianStream([-2, 0, 2]);
    expect(result).toEqual([-2, -1, 0]);
  });

  it("does not mutate the input array", () => {
    const original = [5, 2, 8, 1, 9, 3, 7];
    const originalCopy = [...original];
    findMedianStream(original);
    expect(original).toEqual(originalCopy);
  });

  it("returns a new array for each call", () => {
    const streamA = findMedianStream([1, 2, 3]);
    const streamB = findMedianStream([1, 2, 3]);
    expect(streamA).not.toBe(streamB);
    expect(streamA).toEqual(streamB);
  });

  it("handles a large odd-length stream correctly at the midpoint", () => {
    // [1,3,5,7,9] → medians: 1, 2, 3, 4, 5
    const result = findMedianStream([1, 3, 5, 7, 9]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles two-element stream with equal values", () => {
    const result = findMedianStream([7, 7]);
    expect(result).toEqual([7, 7]);
  });
});
