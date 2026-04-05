import { describe, it, expect } from "vitest";
import { implementQueueUsingStacks } from "./sources/implement-queue-using-stacks.ts?fn";

describe("implementQueueUsingStacks", () => {
  it("dequeues a sequence of values in FIFO order", () => {
    expect(implementQueueUsingStacks([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("preserves FIFO order for a two-element input", () => {
    expect(implementQueueUsingStacks([10, 20])).toEqual([10, 20]);
  });

  it("returns a single-element array unchanged", () => {
    expect(implementQueueUsingStacks([42])).toEqual([42]);
  });

  it("returns an empty array when given no values", () => {
    expect(implementQueueUsingStacks([])).toEqual([]);
  });

  it("preserves FIFO order for duplicate values", () => {
    expect(implementQueueUsingStacks([7, 7, 7])).toEqual([7, 7, 7]);
  });

  it("preserves FIFO order for values in descending order", () => {
    expect(implementQueueUsingStacks([5, 4, 3, 2, 1])).toEqual([5, 4, 3, 2, 1]);
  });

  it("preserves FIFO order for values in ascending order", () => {
    expect(implementQueueUsingStacks([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("preserves FIFO order with negative values", () => {
    expect(implementQueueUsingStacks([-3, -1, 0, 2])).toEqual([-3, -1, 0, 2]);
  });

  it("preserves FIFO order for a larger input", () => {
    const inputValues = [10, 20, 30, 40, 50, 60, 70, 80];
    expect(implementQueueUsingStacks(inputValues)).toEqual(inputValues);
  });
});
