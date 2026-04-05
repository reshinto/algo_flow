import { describe, it, expect } from "vitest";
import { designCircularQueue } from "./sources/design-circular-queue.ts?fn";

describe("designCircularQueue", () => {
  it("enqueues values and returns true for each successful enqueue", () => {
    const result = designCircularQueue(["enqueue 1", "enqueue 2", "enqueue 3"], 3);
    expect(result).toEqual(["true", "true", "true"]);
  });

  it("returns full when enqueueing beyond capacity", () => {
    const result = designCircularQueue(["enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"], 3);
    expect(result).toEqual(["true", "true", "true", "full"]);
  });

  it("returns empty when dequeueing from an empty queue", () => {
    const result = designCircularQueue(["dequeue"], 3);
    expect(result).toEqual(["empty"]);
  });

  it("dequeues values in FIFO order", () => {
    const result = designCircularQueue(
      ["enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"],
      3,
    );
    expect(result).toEqual(["true", "true", "true", "1", "2", "3"]);
  });

  it("wraps rear pointer around using modular arithmetic", () => {
    const result = designCircularQueue(
      ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3", "enqueue 4"],
      3,
    );
    expect(result).toEqual(["true", "true", "1", "true", "true"]);
  });

  it("resets front and rear to -1 after dequeuing the last element", () => {
    const result = designCircularQueue(["enqueue 5", "dequeue", "enqueue 7"], 2);
    expect(result).toEqual(["true", "5", "true"]);
  });

  it("peeks the front value correctly", () => {
    const result = designCircularQueue(["enqueue 10", "enqueue 20", "front"], 3);
    expect(result).toEqual(["true", "true", "10"]);
  });

  it("peeks the rear value correctly", () => {
    const result = designCircularQueue(["enqueue 10", "enqueue 20", "rear"], 3);
    expect(result).toEqual(["true", "true", "20"]);
  });

  it("returns empty for front and rear peek on an empty queue", () => {
    const result = designCircularQueue(["front", "rear"], 3);
    expect(result).toEqual(["empty", "empty"]);
  });

  it("handles the default input correctly", () => {
    const result = designCircularQueue(["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"], 3);
    expect(result).toEqual(["true", "true", "1", "true"]);
  });

  it("handles a capacity-1 queue with enqueue and dequeue", () => {
    const result = designCircularQueue(["enqueue 42", "dequeue", "enqueue 99", "dequeue"], 1);
    expect(result).toEqual(["true", "42", "true", "99"]);
  });

  it("handles alternating enqueue and dequeue across wrap-around", () => {
    const result = designCircularQueue(
      [
        "enqueue 1",
        "enqueue 2",
        "dequeue",
        "enqueue 3",
        "dequeue",
        "enqueue 4",
        "dequeue",
        "dequeue",
      ],
      2,
    );
    expect(result).toEqual(["true", "true", "1", "true", "2", "true", "3", "4"]);
  });

  it("returns empty for dequeue after the queue is fully drained", () => {
    const result = designCircularQueue(["enqueue 1", "dequeue", "dequeue"], 2);
    expect(result).toEqual(["true", "1", "empty"]);
  });
});
