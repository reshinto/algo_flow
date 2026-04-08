import { describe, it, expect } from "vitest";
import { taskSchedulerQueue } from "../sources/task-scheduler.ts?fn";

describe("taskSchedulerQueue", () => {
  it("returns 8 for the canonical example with cooldown 2", () => {
    expect(taskSchedulerQueue(["A", "A", "A", "B", "B", "B"], 2)).toBe(8);
  });

  it("returns tasks.length when tasks are dense enough to fill all slots", () => {
    // A×2, B×2, C×2 with cooldown 1 — no idle slots needed
    expect(taskSchedulerQueue(["A", "A", "B", "B", "C", "C"], 1)).toBe(6);
  });

  it("returns tasks.length when cooldown is 0", () => {
    expect(taskSchedulerQueue(["A", "A", "A", "B", "B", "B"], 0)).toBe(6);
  });

  it("handles a single task type with high frequency and large cooldown", () => {
    // (3-1)*(100+1)+1 = 203
    expect(taskSchedulerQueue(["A", "A", "A"], 100)).toBe(203);
  });

  it("handles a single task occurrence", () => {
    expect(taskSchedulerQueue(["A"], 5)).toBe(1);
  });

  it("handles two task types with equal frequency", () => {
    // maxFreq=2, maxFreqCount=2, cooldown=2 → (2-1)*(3)+2 = 5
    expect(taskSchedulerQueue(["A", "A", "B", "B"], 2)).toBe(5);
  });

  it("handles all identical tasks with zero cooldown", () => {
    expect(taskSchedulerQueue(["A", "A", "A", "A"], 0)).toBe(4);
  });

  it("returns at least tasks.length for any input", () => {
    const result = taskSchedulerQueue(["A", "B", "C", "D", "E", "F"], 3);
    expect(result).toBeGreaterThanOrEqual(6);
  });

  it("handles many distinct task types so idle slots are impossible", () => {
    // 26 distinct tasks, cooldown 25 — exactly 26 tasks fill all slots
    const distinctTasks = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    expect(taskSchedulerQueue(distinctTasks, 25)).toBe(26);
  });

  it("handles repeated application of the same input consistently", () => {
    const firstResult = taskSchedulerQueue(["A", "A", "A", "B", "B", "B"], 2);
    const secondResult = taskSchedulerQueue(["A", "A", "A", "B", "B", "B"], 2);
    expect(firstResult).toBe(secondResult);
  });
});
