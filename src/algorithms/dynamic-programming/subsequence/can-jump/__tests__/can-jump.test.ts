import { describe, it, expect } from "vitest";
import { canJump } from "../sources/can-jump.ts?fn";

describe("canJump", () => {
  it("returns true for [2, 3, 1, 1, 4]", () => {
    expect(canJump([2, 3, 1, 1, 4])).toBe(true);
  });

  it("returns false for [3, 2, 1, 0, 4]", () => {
    expect(canJump([3, 2, 1, 0, 4])).toBe(false);
  });

  it("returns true for a single-element array [0]", () => {
    expect(canJump([0])).toBe(true);
  });

  it("returns true for [1, 2]", () => {
    expect(canJump([1, 2])).toBe(true);
  });

  it("returns false when stuck at first position [0, 1]", () => {
    expect(canJump([0, 1])).toBe(false);
  });

  it("returns true when a large jump clears everything [5, 0, 0, 0, 0, 1]", () => {
    expect(canJump([5, 0, 0, 0, 0, 1])).toBe(true);
  });

  it("returns false when all zeros except the first [0, 0, 0]", () => {
    expect(canJump([0, 0, 0])).toBe(false);
  });

  it("returns true for a single step [1, 0]", () => {
    expect(canJump([1, 0])).toBe(true);
  });
});
