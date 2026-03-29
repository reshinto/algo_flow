import { describe, it, expect } from "vitest";
import { countAnagramWindows } from "./sources/count-anagram-windows.ts?fn";

describe("countAnagramWindows", () => {
  it("finds all anagram windows in a basic array", () => {
    /* text=[1,2,3,1,2,1,3,2,1], pattern=[1,2,3]: windows starting at 0,1,2,4,5,6 are anagrams */
    const result = countAnagramWindows([1, 2, 3, 1, 2, 1, 3, 2, 1], [1, 2, 3]);
    expect(result.count).toBeGreaterThan(0);
    expect(result.positions).toContain(0);
  });

  it("detects anagram at the very first position", () => {
    const result = countAnagramWindows([3, 1, 2, 4, 5], [1, 2, 3]);
    expect(result.positions).toContain(0);
  });

  it("detects anagram at the last position", () => {
    const result = countAnagramWindows([4, 5, 1, 2, 3], [3, 2, 1]);
    expect(result.positions).toContain(2);
  });

  it("returns empty positions when no anagram windows exist", () => {
    const result = countAnagramWindows([1, 1, 1, 1], [1, 2]);
    expect(result.count).toBe(0);
    expect(result.positions).toHaveLength(0);
  });

  it("handles pattern equal to text length — single window check", () => {
    const result = countAnagramWindows([3, 1, 2], [1, 2, 3]);
    expect(result.count).toBe(1);
    expect(result.positions).toEqual([0]);
  });

  it("returns zero count when pattern is longer than text", () => {
    const result = countAnagramWindows([1, 2], [1, 2, 3]);
    expect(result.count).toBe(0);
  });

  it("handles empty text", () => {
    const result = countAnagramWindows([], [1, 2]);
    expect(result.count).toBe(0);
    expect(result.positions).toHaveLength(0);
  });

  it("handles empty pattern", () => {
    const result = countAnagramWindows([1, 2, 3], []);
    expect(result.count).toBe(0);
  });

  it("handles duplicate elements in pattern correctly", () => {
    /* pattern=[1,1,2] needs {1:2,2:1}: [1,1,2] at index 0 matches, [1,2,3] pattern needs distinct elements */
    /* [1,1,2,3] with pattern [1,2,3]: window [1,1,2] has {1:2,2:1} != {1:1,2:1,3:1} — no match at 0 */
    const result = countAnagramWindows([1, 1, 2, 3], [1, 2, 3]);
    expect(result.positions).not.toContain(0);
    expect(result.positions).toContain(1);
  });

  it("returns correct count matching positions length", () => {
    const result = countAnagramWindows([1, 2, 3, 1, 2, 1, 3, 2, 1], [1, 2, 3]);
    expect(result.count).toBe(result.positions.length);
  });
});
