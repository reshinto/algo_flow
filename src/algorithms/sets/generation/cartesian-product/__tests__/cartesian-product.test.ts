import { describe, it, expect } from "vitest";
import { cartesianProduct } from "../sources/cartesian-product.ts?fn";

describe("cartesianProduct", () => {
  it("generates all ordered pairs for the default input", () => {
    expect(cartesianProduct([1, 2, 3], [4, 5])).toEqual([
      [1, 4],
      [1, 5],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
    ]);
  });

  it("generates one pair when both sets have one element", () => {
    expect(cartesianProduct([7], [9])).toEqual([[7, 9]]);
  });

  it("generates n×m pairs for n×m sized inputs", () => {
    const result = cartesianProduct([1, 2], [3, 4]) as number[][];
    expect(result).toHaveLength(4);
  });

  it("returns empty array when setA is empty", () => {
    expect(cartesianProduct([], [4, 5])).toEqual([]);
  });

  it("returns empty array when setB is empty", () => {
    expect(cartesianProduct([1, 2, 3], [])).toEqual([]);
  });

  it("returns empty array when both sets are empty", () => {
    expect(cartesianProduct([], [])).toEqual([]);
  });

  it("preserves order — setA elements vary in outer loop", () => {
    const result = cartesianProduct([10, 20], [1, 2]) as number[][];
    expect(result[0]).toEqual([10, 1]);
    expect(result[1]).toEqual([10, 2]);
    expect(result[2]).toEqual([20, 1]);
    expect(result[3]).toEqual([20, 2]);
  });

  it("each pair is an ordered tuple [elemA, elemB]", () => {
    const result = cartesianProduct([5], [3, 7]) as number[][];
    expect(result).toEqual([
      [5, 3],
      [5, 7],
    ]);
  });

  it("handles duplicate values in sets", () => {
    const result = cartesianProduct([1, 1], [2]) as number[][];
    expect(result).toEqual([
      [1, 2],
      [1, 2],
    ]);
  });
});
