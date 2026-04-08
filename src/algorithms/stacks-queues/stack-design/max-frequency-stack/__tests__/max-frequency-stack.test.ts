import { describe, it, expect } from "vitest";
import { maxFrequencyStack } from "../sources/max-frequency-stack.ts?fn";

describe("maxFrequencyStack", () => {
  it("pops the most frequent element first from the default input", () => {
    const popOrder = maxFrequencyStack([5, 7, 5, 7, 4, 5]) as number[];
    // 5 appears 3 times (highest), then 7 appears 2 times (most recent at freq 2),
    // then 5 at freq 2, then 4 at freq 1 (most recent), then 7, then 5
    expect(popOrder).toEqual([5, 7, 5, 4, 7, 5]);
  });

  it("pops in LIFO order when all elements have the same frequency", () => {
    const popOrder = maxFrequencyStack([1, 2, 3]) as number[];
    // Each appears once — pop in reverse push order
    expect(popOrder).toEqual([3, 2, 1]);
  });

  it("handles a single element pushed multiple times", () => {
    const popOrder = maxFrequencyStack([9, 9, 9]) as number[];
    expect(popOrder).toEqual([9, 9, 9]);
  });

  it("handles two elements alternated — most recent at max freq wins tiebreak", () => {
    const popOrder = maxFrequencyStack([1, 2, 1, 2]) as number[];
    // Both reach freq 2; 2 was pushed last at freq 2, so it pops first
    expect(popOrder).toEqual([2, 1, 2, 1]);
  });

  it("handles a single element", () => {
    const popOrder = maxFrequencyStack([42]) as number[];
    expect(popOrder).toEqual([42]);
  });

  it("returns an empty array for empty input", () => {
    const popOrder = maxFrequencyStack([]) as number[];
    expect(popOrder).toEqual([]);
  });

  it("pops the uniquely most frequent element immediately when it dominates", () => {
    // 7 appears 3 times, all others once
    // Pop order: freq-3 stack: [7] → 7; freq-2 stack: [7] → 7; freq-1 stack: [7,1,2] → pop order 2,1,7
    const popOrder = maxFrequencyStack([7, 1, 7, 2, 7]) as number[];
    expect(popOrder[0]).toBe(7);
    expect(popOrder[1]).toBe(7);
    expect(popOrder[2]).toBe(2);
  });

  it("returns the correct total number of elements", () => {
    const input = [3, 1, 3, 2, 3, 1];
    const popOrder = maxFrequencyStack(input) as number[];
    expect(popOrder).toHaveLength(input.length);
  });
});
