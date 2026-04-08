import { describe, it, expect } from "vitest";
import { kadanesAlgorithm } from "../sources/kadanes-algorithm.ts?fn";

describe("kadanesAlgorithm", () => {
  it("finds the max subarray in a mixed array", () => {
    /* [-2,1,-3,4,-1,2,1,-5,4]: max subarray is [4,-1,2,1] = 6 */
    const result = kadanesAlgorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    expect(result.maxSum).toBe(6);
    expect(result.startIndex).toBe(3);
    expect(result.endIndex).toBe(6);
  });

  it("handles an all-positive array", () => {
    const result = kadanesAlgorithm([1, 2, 3, 4, 5]);
    expect(result.maxSum).toBe(15);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(4);
  });

  it("handles an all-negative array", () => {
    const result = kadanesAlgorithm([-5, -3, -8, -1, -4]);
    expect(result.maxSum).toBe(-1);
    expect(result.startIndex).toBe(3);
    expect(result.endIndex).toBe(3);
  });

  it("handles a single element", () => {
    const result = kadanesAlgorithm([42]);
    expect(result.maxSum).toBe(42);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(0);
  });

  it("handles a single negative element", () => {
    const result = kadanesAlgorithm([-7]);
    expect(result.maxSum).toBe(-7);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(0);
  });

  it("returns zero for an empty array", () => {
    const result = kadanesAlgorithm([]);
    expect(result.maxSum).toBe(0);
    expect(result.startIndex).toBe(-1);
    expect(result.endIndex).toBe(-1);
  });

  it("handles all identical elements", () => {
    const result = kadanesAlgorithm([3, 3, 3, 3]);
    expect(result.maxSum).toBe(12);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(3);
  });

  it("handles all identical negative elements", () => {
    const result = kadanesAlgorithm([-2, -2, -2]);
    expect(result.maxSum).toBe(-2);
  });

  it("handles the max subarray at the start", () => {
    const result = kadanesAlgorithm([10, 9, -100, 1, 2]);
    expect(result.maxSum).toBe(19);
    expect(result.startIndex).toBe(0);
    expect(result.endIndex).toBe(1);
  });

  it("handles the max subarray at the end", () => {
    const result = kadanesAlgorithm([1, -100, 8, 9, 10]);
    expect(result.maxSum).toBe(27);
    expect(result.startIndex).toBe(2);
    expect(result.endIndex).toBe(4);
  });

  it("handles the default input from the algorithm definition", () => {
    const result = kadanesAlgorithm([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    expect(result.maxSum).toBe(6);
    expect(result.startIndex).toBe(3);
    expect(result.endIndex).toBe(6);
  });

  it("handles zeros in the array", () => {
    const result = kadanesAlgorithm([0, 0, -1, 0, 5, 0]);
    expect(result.maxSum).toBe(5);
  });
});
