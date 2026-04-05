import { describe, it, expect } from "vitest";
import { designCircularDeque } from "./sources/design-circular-deque.ts?fn";

describe("designCircularDeque", () => {
  it("pushBack values and returns true for each successful push", () => {
    const result = designCircularDeque(["pushBack 1", "pushBack 2", "pushBack 3"], 3);
    expect(result).toEqual(["true", "true", "true"]);
  });

  it("returns full when pushing beyond capacity", () => {
    const result = designCircularDeque(["pushBack 1", "pushBack 2", "pushBack 3", "pushBack 4"], 3);
    expect(result).toEqual(["true", "true", "true", "full"]);
  });

  it("returns empty when popping from an empty deque", () => {
    const result = designCircularDeque(["popFront"], 3);
    expect(result).toEqual(["empty"]);
  });

  it("returns empty when popping back from an empty deque", () => {
    const result = designCircularDeque(["popBack"], 3);
    expect(result).toEqual(["empty"]);
  });

  it("popFront removes elements in FIFO order for pushBack operations", () => {
    const result = designCircularDeque(
      ["pushBack 1", "pushBack 2", "pushBack 3", "popFront", "popFront", "popFront"],
      3,
    );
    expect(result).toEqual(["true", "true", "true", "1", "2", "3"]);
  });

  it("pushFront inserts at the front so popFront retrieves in LIFO order", () => {
    const result = designCircularDeque(
      ["pushFront 1", "pushFront 2", "pushFront 3", "popFront", "popFront", "popFront"],
      3,
    );
    expect(result).toEqual(["true", "true", "true", "3", "2", "1"]);
  });

  it("popBack removes the most recently pushed back element", () => {
    const result = designCircularDeque(["pushBack 10", "pushBack 20", "popBack"], 3);
    expect(result).toEqual(["true", "true", "20"]);
  });

  it("handles the default input correctly", () => {
    const result = designCircularDeque(["pushBack 1", "pushFront 2", "popBack", "pushBack 3"], 3);
    expect(result).toEqual(["true", "true", "1", "true"]);
  });

  it("wraps rear pointer around using modular arithmetic on pushBack", () => {
    const result = designCircularDeque(
      ["pushBack 1", "pushBack 2", "popFront", "pushBack 3", "pushBack 4"],
      3,
    );
    expect(result).toEqual(["true", "true", "1", "true", "true"]);
  });

  it("wraps front pointer around using modular arithmetic on pushFront", () => {
    const result = designCircularDeque(["pushBack 1", "pushBack 2", "pushFront 0"], 3);
    expect(result).toEqual(["true", "true", "true"]);
  });

  it("resets front and rear to -1 after removing the last element via popFront", () => {
    const result = designCircularDeque(["pushBack 5", "popFront", "pushBack 7"], 2);
    expect(result).toEqual(["true", "5", "true"]);
  });

  it("resets front and rear to -1 after removing the last element via popBack", () => {
    const result = designCircularDeque(["pushBack 5", "popBack", "pushBack 7"], 2);
    expect(result).toEqual(["true", "5", "true"]);
  });

  it("peeks the front value correctly", () => {
    const result = designCircularDeque(["pushBack 10", "pushBack 20", "peekFront"], 3);
    expect(result).toEqual(["true", "true", "10"]);
  });

  it("peeks the rear value correctly", () => {
    const result = designCircularDeque(["pushBack 10", "pushBack 20", "peekRear"], 3);
    expect(result).toEqual(["true", "true", "20"]);
  });

  it("returns empty for peekFront and peekRear on an empty deque", () => {
    const result = designCircularDeque(["peekFront", "peekRear"], 3);
    expect(result).toEqual(["empty", "empty"]);
  });

  it("handles a capacity-1 deque with pushBack and popFront", () => {
    const result = designCircularDeque(["pushBack 42", "popFront", "pushBack 99", "popFront"], 1);
    expect(result).toEqual(["true", "42", "true", "99"]);
  });

  it("handles a capacity-1 deque with pushFront and popBack", () => {
    const result = designCircularDeque(["pushFront 7", "popBack", "pushFront 8", "popBack"], 1);
    expect(result).toEqual(["true", "7", "true", "8"]);
  });

  it("rejects pushFront when full", () => {
    const result = designCircularDeque(["pushBack 1", "pushBack 2", "pushFront 0"], 2);
    expect(result).toEqual(["true", "true", "full"]);
  });

  it("interleaves pushFront and pushBack correctly", () => {
    const result = designCircularDeque(["pushBack 1", "pushFront 2", "peekFront", "peekRear"], 3);
    expect(result).toEqual(["true", "true", "2", "1"]);
  });

  it("handles alternating pushBack and popFront across wrap-around", () => {
    const result = designCircularDeque(
      [
        "pushBack 1",
        "pushBack 2",
        "popFront",
        "pushBack 3",
        "popFront",
        "pushBack 4",
        "popFront",
        "popFront",
      ],
      2,
    );
    expect(result).toEqual(["true", "true", "1", "true", "2", "true", "3", "4"]);
  });

  it("returns empty for popFront after the deque is fully drained", () => {
    const result = designCircularDeque(["pushBack 1", "popFront", "popFront"], 2);
    expect(result).toEqual(["true", "1", "empty"]);
  });
});
