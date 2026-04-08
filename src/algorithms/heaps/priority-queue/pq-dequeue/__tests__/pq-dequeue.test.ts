import { describe, it, expect } from "vitest";
import { pqDequeue } from "../sources/pq-dequeue.ts?fn";

/** Verify min-heap property: every parent ≤ both children. */
function isMinHeap(array: number[]): boolean {
  const heapSize = array.length;
  for (let parentIdx = 0; parentIdx < Math.floor(heapSize / 2); parentIdx++) {
    const leftIdx = 2 * parentIdx + 1;
    const rightIdx = 2 * parentIdx + 2;
    if (leftIdx < heapSize && array[parentIdx]! > array[leftIdx]!) return false;
    if (rightIdx < heapSize && array[parentIdx]! > array[rightIdx]!) return false;
  }
  return true;
}

describe("pqDequeue", () => {
  it("returns the minimum element from the default input", () => {
    const result = pqDequeue([2, 5, 3, 10, 15, 8, 7]) as {
      dequeuedValue: number;
      remainingQueue: number[];
    };
    expect(result.dequeuedValue).toBe(2);
  });

  it("remaining queue is a valid min-heap after dequeue", () => {
    const result = pqDequeue([2, 5, 3, 10, 15, 8, 7]) as {
      dequeuedValue: number;
      remainingQueue: number[];
    };
    expect(isMinHeap(result.remainingQueue)).toBe(true);
  });

  it("remaining queue has one fewer element", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const result = pqDequeue(original) as { dequeuedValue: number; remainingQueue: number[] };
    expect(result.remainingQueue.length).toBe(original.length - 1);
  });

  it("dequeued value is not in the remaining queue", () => {
    const result = pqDequeue([2, 5, 3, 10, 15, 8, 7]) as {
      dequeuedValue: number;
      remainingQueue: number[];
    };
    expect(result.remainingQueue.includes(2)).toBe(false);
  });

  it("dequeues from a single-element queue", () => {
    const result = pqDequeue([42]) as { dequeuedValue: number; remainingQueue: number[] };
    expect(result.dequeuedValue).toBe(42);
    expect(result.remainingQueue).toEqual([]);
  });

  it("dequeues the correct minimum from a two-element queue", () => {
    const result = pqDequeue([3, 7]) as { dequeuedValue: number; remainingQueue: number[] };
    expect(result.dequeuedValue).toBe(3);
    expect(isMinHeap(result.remainingQueue)).toBe(true);
  });

  it("does not mutate the original array", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const originalCopy = [...original];
    pqDequeue(original);
    expect(original).toEqual(originalCopy);
  });

  it("remaining queue contains all original elements except the dequeued value", () => {
    const original = [2, 5, 3, 10, 15, 8, 7];
    const result = pqDequeue(original) as { dequeuedValue: number; remainingQueue: number[] };
    const combined = [...result.remainingQueue, result.dequeuedValue].sort(
      (valueA, valueB) => valueA - valueB,
    );
    expect(combined).toEqual([...original].sort((valueA, valueB) => valueA - valueB));
  });

  it("new root after dequeue is the second smallest element", () => {
    const result = pqDequeue([2, 5, 3, 10, 15, 8, 7]) as {
      dequeuedValue: number;
      remainingQueue: number[];
    };
    expect(result.remainingQueue[0]).toBe(3);
  });
});
