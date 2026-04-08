import { describe, it, expect } from "vitest";
import { numberOfRecentCalls } from "../sources/number-of-recent-calls.ts?fn";

describe("numberOfRecentCalls", () => {
  it("produces [1,2,3,3] for the default input [1,100,3001,3002]", () => {
    expect(numberOfRecentCalls([1, 100, 3001, 3002])).toEqual([1, 2, 3, 3]);
  });

  it("returns [1] for a single timestamp", () => {
    expect(numberOfRecentCalls([500])).toEqual([1]);
  });

  it("counts all calls when all timestamps fit in one window", () => {
    expect(numberOfRecentCalls([1, 500, 1000, 2000, 3000])).toEqual([1, 2, 3, 4, 5]);
  });

  it("expires old timestamps when window slides forward", () => {
    const result = numberOfRecentCalls([1, 100, 3001, 3002, 6002]);
    expect(result).toEqual([1, 2, 3, 3, 2]);
  });

  it("handles timestamps exactly at the window boundary", () => {
    // t=3001: window is [1, 3001], so timestamp=1 is included (1 >= 3001-3000 = 1)
    expect(numberOfRecentCalls([1, 3001])).toEqual([1, 2]);
  });

  it("expires a timestamp one millisecond past the boundary", () => {
    // t=3002: window is [2, 3002], timestamp=1 is excluded (1 < 2)
    expect(numberOfRecentCalls([1, 3002])).toEqual([1, 1]);
  });

  it("returns [1] for each call when all are spaced more than 3000ms apart", () => {
    expect(numberOfRecentCalls([1, 3002, 6003, 9004])).toEqual([1, 1, 1, 1]);
  });

  it("handles an empty timestamps array", () => {
    expect(numberOfRecentCalls([])).toEqual([]);
  });

  it("handles a large burst followed by silence", () => {
    const burstTimestamps = [100, 200, 300, 400, 500];
    const result = numberOfRecentCalls(burstTimestamps);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles sequential timestamps that all expire one by one", () => {
    const result = numberOfRecentCalls([1000, 2000, 4001, 5001, 7002]);
    expect(result).toEqual([1, 2, 2, 2, 2]);
  });
});
