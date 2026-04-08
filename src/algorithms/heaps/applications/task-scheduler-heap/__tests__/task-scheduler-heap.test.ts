import { describe, it, expect } from "vitest";
import { taskSchedulerHeap } from "../sources/task-scheduler-heap.ts?fn";

describe("taskSchedulerHeap", () => {
  it("returns 8 for [A,A,A,B,B,B] with cooldown=2", () => {
    const result = taskSchedulerHeap(["A", "A", "A", "B", "B", "B"], 2);
    expect(result).toBe(8);
  });

  it("returns 6 for [A,A,A,B,B,B] with cooldown=0 — no cooldown needed", () => {
    const result = taskSchedulerHeap(["A", "A", "A", "B", "B", "B"], 0);
    expect(result).toBe(6);
  });

  it("returns 6 for [A,A,A,B,B,B] with cooldown=1", () => {
    const result = taskSchedulerHeap(["A", "A", "A", "B", "B", "B"], 1);
    expect(result).toBe(6);
  });

  it("returns correct value for single task type with cooldown", () => {
    // A,A,A with n=2: A _ _ A _ _ A = 7
    const result = taskSchedulerHeap(["A", "A", "A"], 2);
    expect(result).toBe(7);
  });

  it("returns 1 for a single task", () => {
    const result = taskSchedulerHeap(["A"], 0);
    expect(result).toBe(1);
  });

  it("returns 1 for a single task with large cooldown", () => {
    const result = taskSchedulerHeap(["A"], 10);
    expect(result).toBe(1);
  });

  it("handles [A,C,A,B,D,B] with cooldown=1", () => {
    // 6 tasks, cooldown=1, frequencies: A:2, B:2, C:1, D:1 — no idles needed
    const result = taskSchedulerHeap(["A", "C", "A", "B", "D", "B"], 1);
    expect(result).toBe(6);
  });

  it("returns at least tasks.length", () => {
    const tasks = ["A", "A", "A", "B", "B", "B"];
    const result = taskSchedulerHeap(tasks, 2) as number;
    expect(result).toBeGreaterThanOrEqual(tasks.length);
  });

  it("result is a positive integer", () => {
    const result = taskSchedulerHeap(["A", "A", "B"], 1) as number;
    expect(result).toBeGreaterThan(0);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("handles many task types with cooldown=0 — just the count", () => {
    const tasks = ["A", "B", "C", "D", "E"];
    const result = taskSchedulerHeap(tasks, 0);
    expect(result).toBe(tasks.length);
  });
});
