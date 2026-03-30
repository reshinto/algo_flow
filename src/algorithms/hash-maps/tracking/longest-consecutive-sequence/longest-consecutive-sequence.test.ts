import { describe, it, expect } from "vitest";
import { longestConsecutiveSequence } from "./sources/longest-consecutive-sequence.ts?fn";

describe("longestConsecutiveSequence", () => {
  it("finds the sequence [1,2,3,4] in the default example", () => {
    expect(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  it("returns 1 for an array with no consecutive pairs", () => {
    expect(longestConsecutiveSequence([10, 20, 30])).toBe(1);
  });

  it("handles a fully consecutive array", () => {
    expect(longestConsecutiveSequence([1, 2, 3, 4, 5])).toBe(5);
  });

  it("handles a single-element array", () => {
    expect(longestConsecutiveSequence([42])).toBe(1);
  });

  it("handles duplicate values in the input", () => {
    expect(longestConsecutiveSequence([1, 2, 2, 3])).toBe(3);
  });

  it("handles negative numbers in the sequence", () => {
    expect(longestConsecutiveSequence([-3, -2, -1, 0, 1])).toBe(5);
  });

  it("handles a sequence that spans negative and positive numbers", () => {
    expect(longestConsecutiveSequence([-1, 0, 1])).toBe(3);
  });

  it("returns the correct length when two disjoint sequences exist", () => {
    // Sequences: [1,2,3] length 3 and [10,11,12,13] length 4
    expect(longestConsecutiveSequence([1, 2, 3, 10, 11, 12, 13])).toBe(4);
  });

  it("handles an unsorted input correctly", () => {
    expect(longestConsecutiveSequence([5, 1, 3, 2, 4])).toBe(5);
  });
});
