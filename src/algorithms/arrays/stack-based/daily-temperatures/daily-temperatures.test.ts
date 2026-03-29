import { describe, it, expect } from "vitest";
import { dailyTemperatures } from "./sources/daily-temperatures.ts?fn";

describe("dailyTemperatures", () => {
  it("resolves default input [73,74,75,71,69,72,76,73]", () => {
    /* Expected: day 0 waits 1, day 1 waits 1, day 2 waits 4, day 3 waits 2, day 4 waits 1, day 5 waits 1, days 6+7 wait 0 */
    const result = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
    expect(result).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });

  it("returns all zeros for strictly decreasing temperatures", () => {
    /* No future day is warmer */
    const result = dailyTemperatures([5, 4, 3, 2, 1]);
    expect(result).toEqual([0, 0, 0, 0, 0]);
  });

  it("returns correct waits for strictly increasing temperatures", () => {
    /* Each day's next warmer day is exactly one day ahead */
    const result = dailyTemperatures([1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 1, 1, 1, 0]);
  });

  it("returns all zeros for all equal temperatures", () => {
    /* Equal temperatures do not count as warmer */
    const result = dailyTemperatures([5, 5, 5, 5]);
    expect(result).toEqual([0, 0, 0, 0]);
  });

  it("handles single day", () => {
    const result = dailyTemperatures([72]);
    expect(result).toEqual([0]);
  });

  it("handles empty array", () => {
    const result = dailyTemperatures([]);
    expect(result).toEqual([]);
  });

  it("handles two days where second is warmer", () => {
    const result = dailyTemperatures([60, 70]);
    expect(result).toEqual([1, 0]);
  });

  it("handles two days where second is cooler", () => {
    const result = dailyTemperatures([70, 60]);
    expect(result).toEqual([0, 0]);
  });

  it("resolves the LeetCode example [30,40,50,60]", () => {
    const result = dailyTemperatures([30, 40, 50, 60]);
    expect(result).toEqual([1, 1, 1, 0]);
  });

  it("resolves the LeetCode example [30,60,90]", () => {
    const result = dailyTemperatures([30, 60, 90]);
    expect(result).toEqual([1, 1, 0]);
  });
});
