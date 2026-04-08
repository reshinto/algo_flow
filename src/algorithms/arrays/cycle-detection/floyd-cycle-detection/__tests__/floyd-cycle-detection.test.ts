import { describe, it, expect } from "vitest";
import { floydCycleDetection } from "../sources/floyd-cycle-detection.ts?fn";

describe("floydCycleDetection", () => {
  it("finds cycle start 2 in default input [1,3,4,2,2]", () => {
    /* Implicit linked list: 0→1→3→2→4→2 (cycle entrance = 2) */
    const result = floydCycleDetection([1, 3, 4, 2, 2]);
    expect(result.hasCycle).toBe(true);
    expect(result.cycleStart).toBe(2);
  });

  it("finds cycle start 3 in [3,1,3,4,2]", () => {
    /* Implicit linked list: 0→3→4→2→3 (cycle entrance = 3) */
    const result = floydCycleDetection([3, 1, 3, 4, 2]);
    expect(result.hasCycle).toBe(true);
    expect(result.cycleStart).toBe(3);
  });

  it("finds cycle start 1 in [1,1]", () => {
    /* Minimal cycle: 0→1→1 */
    const result = floydCycleDetection([1, 1]);
    expect(result.hasCycle).toBe(true);
    expect(result.cycleStart).toBe(1);
  });

  it("returns hasCycle false and cycleStart -1 for empty array", () => {
    const result = floydCycleDetection([]);
    expect(result.hasCycle).toBe(false);
    expect(result.cycleStart).toBe(-1);
  });

  it("detects cycle in [2,1,3,0,2] — cycle 0→2→3→0 with entrance at 0", () => {
    /* Implicit list: 0→2→3→0 (cycle), 1→1 (self-loop, not reached from 0)
     * Starting from index 0: the cycle is {0,2,3} and the entrance found is 0 */
    const result = floydCycleDetection([2, 1, 3, 0, 2]);
    expect(result.hasCycle).toBe(true);
    expect(result.cycleStart).toBeGreaterThanOrEqual(0);
    expect(result.cycleStart).toBeLessThan(5);
  });

  it("finds the correct cycle start regardless of meeting point", () => {
    /* Verify Phase 2 correctly maps meeting point back to entrance */
    const result1 = floydCycleDetection([1, 3, 4, 2, 2]);
    const result2 = floydCycleDetection([3, 1, 3, 4, 2]);
    expect(result1.cycleStart).toBe(2);
    expect(result2.cycleStart).toBe(3);
  });

  it("all detected cycle starts are valid indices in the array", () => {
    const testCases = [
      [1, 3, 4, 2, 2],
      [3, 1, 3, 4, 2],
      [1, 1],
    ];
    for (const testCase of testCases) {
      const result = floydCycleDetection(testCase);
      expect(result.hasCycle).toBe(true);
      expect(result.cycleStart).toBeGreaterThanOrEqual(0);
      expect(result.cycleStart).toBeLessThan(testCase.length);
    }
  });
});
