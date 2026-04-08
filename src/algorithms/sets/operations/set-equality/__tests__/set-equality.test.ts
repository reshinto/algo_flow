import { describe, it, expect } from "vitest";
import { setEquality } from "../sources/set-equality.ts?fn";

describe("setEquality", () => {
  it("returns true for the default input (same elements, different order)", () => {
    expect(setEquality([3, 1, 2], [2, 3, 1])).toEqual({ isEqual: true });
  });

  it("returns true for identical arrays", () => {
    expect(setEquality([1, 2, 3], [1, 2, 3])).toEqual({ isEqual: true });
  });

  it("returns false when B has an element not in A", () => {
    expect(setEquality([1, 2, 3], [1, 2, 9])).toEqual({ isEqual: false });
  });

  it("returns false when A has more unique elements than B", () => {
    expect(setEquality([1, 2, 3, 4], [1, 2, 3])).toEqual({ isEqual: false });
  });

  it("returns false when B has more unique elements than A", () => {
    expect(setEquality([1, 2, 3], [1, 2, 3, 4])).toEqual({ isEqual: false });
  });

  it("returns true for two empty arrays", () => {
    expect(setEquality([], [])).toEqual({ isEqual: true });
  });

  it("returns false when A is empty and B is non-empty", () => {
    expect(setEquality([], [1])).toEqual({ isEqual: false });
  });

  it("returns false when B is empty and A is non-empty", () => {
    expect(setEquality([1], [])).toEqual({ isEqual: false });
  });

  it("handles duplicates in A — unique count matters", () => {
    // A = {1, 2}, B = {1, 2, 3} — not equal
    expect(setEquality([1, 1, 2], [1, 2, 3])).toEqual({ isEqual: false });
  });

  it("handles duplicates in B — unique count matters", () => {
    // A = {1, 2, 3}, B = {1, 2} — not equal
    expect(setEquality([1, 2, 3], [1, 1, 2])).toEqual({ isEqual: false });
  });

  it("returns true when both arrays have duplicates but same unique set", () => {
    // A = {1, 2, 3}, B = {1, 2, 3}
    expect(setEquality([1, 1, 2, 3], [1, 2, 2, 3])).toEqual({ isEqual: true });
  });

  it("handles single-element equal arrays", () => {
    expect(setEquality([7], [7])).toEqual({ isEqual: true });
  });

  it("handles single-element unequal arrays", () => {
    expect(setEquality([7], [8])).toEqual({ isEqual: false });
  });
});
