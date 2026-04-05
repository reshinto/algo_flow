import { describe, it, expect } from "vitest";
import { minStack } from "./sources/min-stack.ts?fn";

describe("minStack", () => {
  it("returns 1 for the default input [5, 3, 7, 1, 8]", () => {
    expect(minStack([5, 3, 7, 1, 8])).toBe(1);
  });

  it("returns 1 for an already ascending sequence [1, 2, 3]", () => {
    expect(minStack([1, 2, 3])).toBe(1);
  });

  it("returns 1 for a strictly descending sequence [3, 2, 1]", () => {
    expect(minStack([3, 2, 1])).toBe(1);
  });

  it("returns the single element when given a single-element array", () => {
    expect(minStack([42])).toBe(42);
  });

  it("returns the correct minimum when all values are equal", () => {
    expect(minStack([7, 7, 7])).toBe(7);
  });

  it("handles negative numbers correctly", () => {
    expect(minStack([5, -3, 2, -1])).toBe(-3);
  });

  it("returns the minimum when it appears first", () => {
    expect(minStack([1, 5, 10, 20])).toBe(1);
  });

  it("returns the minimum when it appears last", () => {
    expect(minStack([20, 10, 5, 1])).toBe(1);
  });
});
