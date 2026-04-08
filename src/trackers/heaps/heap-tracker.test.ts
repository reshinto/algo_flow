import { describe, it, expect } from "vitest";

import type { HeapVisualState } from "@/types";
import type { LineMap } from "../base-tracker";

import { HeapTracker } from "./heap-tracker";

const MOCK_LINE_MAP: LineMap = {
  initialize: { typescript: [1], python: [1], java: [1], rust: [], cpp: [], go: [] },
  "sift-down": { typescript: [3, 4], python: [3], java: [4, 5], rust: [], cpp: [], go: [] },
  "sift-up": { typescript: [6, 7], python: [5, 6], java: [7, 8], rust: [], cpp: [], go: [] },
  compare: { typescript: [8], python: [7], java: [9], rust: [], cpp: [], go: [] },
  "heap-swap": { typescript: [10, 11], python: [9], java: [11, 12], rust: [], cpp: [], go: [] },
  "heap-insert": { typescript: [13], python: [10], java: [14], rust: [], cpp: [], go: [] },
  "heap-extract": { typescript: [14], python: [11], java: [15], rust: [], cpp: [], go: [] },
  "heap-update": { typescript: [15], python: [12], java: [16], rust: [], cpp: [], go: [] },
  visit: { typescript: [16], python: [13], java: [17], rust: [], cpp: [], go: [] },
  complete: { typescript: [17], python: [14], java: [18], rust: [], cpp: [], go: [] },
};

describe("HeapTracker", () => {
  it("initializes with correct heap state", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.initialize({ arrayLength: 3 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("initialize");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.kind).toBe("heap");
    expect(visualState.nodes).toHaveLength(3);
    expect(visualState.nodes[0]!.value).toBe(5);
    expect(visualState.nodes[0]!.state).toBe("default");
  });

  it("records a sift-down step with current state", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.startSiftDown(0, { startIdx: 0 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("sift-down");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.state).toBe("current");
    expect(visualState.activeIndex).toBe(0);
  });

  it("records a sift-up step with current state", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.startSiftUp(2, { idx: 2 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("sift-up");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[2]!.state).toBe("current");
    expect(visualState.activeIndex).toBe(2);
  });

  it("records a compare step with correct metrics", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.compare(0, 1, { parent: 5, child: 3 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("compare");
    expect(steps[0]!.metrics.comparisons).toBe(1);

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.state).toBe("comparing");
    expect(visualState.nodes[1]!.state).toBe("comparing");
    expect(visualState.nodes[2]!.state).toBe("default");
  });

  it("records a heap-swap step and mutates values", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.heapSwap(0, 1, { idxA: 0, idxB: 1 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("heap-swap");
    expect(steps[0]!.metrics.swaps).toBe(1);

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.value).toBe(3);
    expect(visualState.nodes[1]!.value).toBe(5);
    expect(visualState.nodes[0]!.state).toBe("swapping");
    expect(visualState.nodes[1]!.state).toBe("swapping");
  });

  it("marks a node as settled", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.markSettled(0, { idx: 0 });

    const steps = tracker.getSteps();
    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.state).toBe("settled");
    expect(visualState.activeIndex).toBeNull();
  });

  it("adds a new node at the end", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.addNode(2, { value: 2 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("heap-insert");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes).toHaveLength(4);
    expect(visualState.nodes[3]!.value).toBe(2);
    expect(visualState.nodes[3]!.state).toBe("inserted");
    expect(visualState.activeIndex).toBe(3);
  });

  it("removes the last node", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.removeNode({ removedValue: 5 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("heap-extract");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes).toHaveLength(2);
  });

  it("marks a node as extracted", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.markExtracted(0, { idx: 0 });

    const steps = tracker.getSteps();
    expect(steps[0]!.type).toBe("heap-extract");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.state).toBe("extracted");
  });

  it("updates a node value in-place", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.updateValue(0, 2, { idx: 0, oldValue: 5, newValue: 2 });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("heap-update");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.value).toBe(2);
    expect(visualState.nodes[0]!.state).toBe("updated");
  });

  it("highlights a node", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.markHighlighted(0, { idx: 0 });

    const steps = tracker.getSteps();
    expect(steps[0]!.type).toBe("visit");

    const visualState = steps[0]!.visualState as HeapVisualState;
    expect(visualState.nodes[0]!.state).toBe("highlighted");
  });

  it("completes with all nodes settled", () => {
    const tracker = new HeapTracker([1, 3, 5], MOCK_LINE_MAP);
    tracker.complete({ result: [1, 3, 5] });

    const steps = tracker.getSteps();
    expect(steps).toHaveLength(1);
    expect(steps[0]!.type).toBe("complete");

    const visualState = steps[0]!.visualState as HeapVisualState;
    for (const node of visualState.nodes) {
      expect(node.state).toBe("settled");
    }
  });

  it("accumulates metrics across multiple steps", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.compare(0, 1, {});
    tracker.compare(0, 2, {});
    tracker.heapSwap(0, 2, {});

    const steps = tracker.getSteps();
    expect(steps[2]!.metrics.comparisons).toBe(2);
    expect(steps[2]!.metrics.swaps).toBe(1);
  });

  it("resets transient states between operations", () => {
    const tracker = new HeapTracker([5, 3, 1], MOCK_LINE_MAP);
    tracker.compare(0, 1, {});
    tracker.startSiftDown(0, {});

    const steps = tracker.getSteps();
    const secondState = steps[1]!.visualState as HeapVisualState;
    expect(secondState.nodes[1]!.state).toBe("default");
  });
});
