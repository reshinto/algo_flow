import { describe, it, expect } from "vitest";
import { rotateArray } from "./sources/rotate-array.ts?fn";

describe("rotateArray", () => {
  it("rotates array to the right by k positions", () => {
    const result = rotateArray([1, 2, 3, 4, 5, 6, 7], 3);
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  it("returns unchanged array when k=0", () => {
    const result = rotateArray([1, 2, 3, 4, 5], 0);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns unchanged array when k equals array length", () => {
    const result = rotateArray([1, 2, 3, 4, 5], 5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles k greater than array length using modulo", () => {
    const result = rotateArray([1, 2, 3, 4, 5], 7);
    expect(result).toEqual(rotateArray([1, 2, 3, 4, 5], 2));
  });

  it("handles a single element", () => {
    const result = rotateArray([42], 1);
    expect(result).toEqual([42]);
  });

  it("handles an empty array", () => {
    const result = rotateArray([], 3);
    expect(result).toEqual([]);
  });

  it("rotates a two-element array by 1", () => {
    const result = rotateArray([1, 2], 1);
    expect(result).toEqual([2, 1]);
  });

  it("handles the default input correctly", () => {
    const result = rotateArray([1, 2, 3, 4, 5, 6, 7], 3);
    expect(result).toEqual([5, 6, 7, 1, 2, 3, 4]);
  });

  it("rotates by n-1 positions (one left shift equivalent)", () => {
    const result = rotateArray([1, 2, 3, 4, 5], 4);
    expect(result).toEqual([2, 3, 4, 5, 1]);
  });

  it("handles k equal to a multiple of array length", () => {
    const result = rotateArray([1, 2, 3], 6);
    expect(result).toEqual([1, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const original = [1, 2, 3, 4, 5];
    rotateArray(original, 2);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles rotation by 1 for a larger array", () => {
    const result = rotateArray([1, 2, 3, 4, 5], 1);
    expect(result).toEqual([5, 1, 2, 3, 4]);
  });
});
