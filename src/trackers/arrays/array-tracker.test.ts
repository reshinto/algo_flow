import { describe, it, expect } from "vitest";

import type { ArrayVisualState } from "@/types";
import type { LineMap } from "../base-tracker";

import { ArrayTracker } from "./array-tracker";

const MOCK_LINE_MAP: LineMap = {
  initialize: { typescript: [1], python: [1], java: [1], rust: [], cpp: [], go: [] },
  compare: { typescript: [3, 4], python: [3], java: [4, 5], rust: [], cpp: [], go: [] },
  swap: { typescript: [5, 6], python: [4, 5], java: [6, 7], rust: [], cpp: [], go: [] },
  visit: { typescript: [7], python: [6], java: [8], rust: [], cpp: [], go: [] },
  "move-window": { typescript: [8], python: [7], java: [9], rust: [], cpp: [], go: [] },
  "expand-window": { typescript: [9], python: [8], java: [10], rust: [], cpp: [], go: [] },
  "shrink-window": { typescript: [10], python: [9], java: [11], rust: [], cpp: [], go: [] },
  complete: { typescript: [12], python: [10], java: [13], rust: [], cpp: [], go: [] },
};

describe("ArrayTracker", () => {
  describe("phantom window fix", () => {
    it("does not apply in-window state when window is inactive", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.initialize({ arrayLength: 3 });

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;

      expect(visualState.windowRange).toBeUndefined();
      for (const element of visualState.elements) {
        expect(element.state).toBe("default");
      }
    });

    it("applies in-window state after moveWindow activates the window", () => {
      const tracker = new ArrayTracker([5, 3, 1, 8], MOCK_LINE_MAP);
      tracker.moveWindow(0, 1, { windowStart: 0, windowEnd: 1 });

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;

      expect(visualState.windowRange).toEqual([0, 1]);
      expect(visualState.elements[0]!.state).toBe("in-window");
      expect(visualState.elements[1]!.state).toBe("in-window");
      expect(visualState.elements[2]!.state).toBe("default");
    });

    it("can be explicitly activated with setWindowActive", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.setWindowActive(true);
      tracker.initialize({});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.windowRange).toEqual([0, 0]);
    });

    it("can be explicitly deactivated with setWindowActive", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.moveWindow(0, 1, {});
      tracker.setWindowActive(false);
      tracker.initialize({});

      const steps = tracker.getSteps();
      const lastVisualState = steps[1]!.visualState as ArrayVisualState;
      expect(lastVisualState.windowRange).toBeUndefined();
    });
  });

  describe("initialize", () => {
    it("creates an initialize step with correct array state", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.initialize({ arrayLength: 3 });

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(1);
      expect(steps[0]!.type).toBe("initialize");

      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.kind).toBe("array");
      expect(visualState.elements).toHaveLength(3);
      expect(visualState.elements[0]!.value).toBe(5);
      expect(visualState.elements[0]!.state).toBe("default");
    });
  });

  describe("swap", () => {
    it("swaps element values in place", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.swap(0, 2, { swapReason: "partition" });

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(1);
      expect(steps[0]!.type).toBe("swap");

      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.elements[0]!.value).toBe(1);
      expect(visualState.elements[2]!.value).toBe(5);
    });

    it("marks both swapped elements with swapping state in the snapshot", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.swap(0, 1, {});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.elements[0]!.state).toBe("swapping");
      expect(visualState.elements[1]!.state).toBe("swapping");
      expect(visualState.elements[2]!.state).toBe("default");
    });

    it("increments swap metric", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.swap(0, 1, {});
      tracker.swap(1, 2, {});

      const steps = tracker.getSteps();
      expect(steps[1]!.metrics.swaps).toBe(2);
    });

    it("resets element state to default after snapshot", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.swap(0, 1, {});
      tracker.visit(0, {});

      const steps = tracker.getSteps();
      const visitVisualState = steps[1]!.visualState as ArrayVisualState;
      expect(visitVisualState.elements[0]!.state).toBe("default");
      expect(visitVisualState.elements[1]!.state).toBe("default");
    });

    it("includes pointer labels for both swap indices", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.swap(0, 2, {});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.pointers).toEqual({ swapA: 0, swapB: 2 });
    });
  });

  describe("compareTwo", () => {
    it("marks both elements as comparing in the snapshot", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.compareTwo(0, 2, { target: 6 });

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(1);
      expect(steps[0]!.type).toBe("compare");

      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.elements[0]!.state).toBe("comparing");
      expect(visualState.elements[2]!.state).toBe("comparing");
      expect(visualState.elements[1]!.state).toBe("default");
    });

    it("increments comparison metric", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.compareTwo(0, 1, {});
      tracker.compareTwo(0, 2, {});

      const steps = tracker.getSteps();
      expect(steps[1]!.metrics.comparisons).toBe(2);
    });

    it("includes left and right pointer labels", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.compareTwo(0, 2, {});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.pointers).toEqual({ left: 0, right: 2 });
    });

    it("resets element state to default after snapshot", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.compareTwo(0, 1, {});
      tracker.visit(0, {});

      const steps = tracker.getSteps();
      const visitVisualState = steps[1]!.visualState as ArrayVisualState;
      expect(visitVisualState.elements[0]!.state).toBe("default");
      expect(visitVisualState.elements[1]!.state).toBe("default");
    });
  });

  describe("markElement", () => {
    it("sets the specified element to the given state", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.markElement(1, "found", { reason: "target found" });

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(1);
      expect(steps[0]!.type).toBe("visit");

      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.elements[1]!.state).toBe("found");
      expect(visualState.elements[0]!.state).toBe("default");
    });

    it("allows overriding the step type", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.markElement(0, "sorted", {}, "Element placed in correct position", "mark-sorted");

      const steps = tracker.getSteps();
      expect(steps[0]!.type).toBe("mark-sorted");
    });

    it("persists element state across subsequent snapshots", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.markElement(0, "sorted", {});
      tracker.visit(1, {});

      const steps = tracker.getSteps();
      const visitVisualState = steps[1]!.visualState as ArrayVisualState;
      expect(visitVisualState.elements[0]!.state).toBe("sorted");
    });

    it("includes markedIndex pointer", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.markElement(2, "eliminated", {});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.pointers).toEqual({ markedIndex: 2 });
    });
  });

  describe("window operations", () => {
    it("expandWindow activates the window", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.expandWindow({});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.windowRange).toBeDefined();
    });

    it("shrinkWindow activates the window", () => {
      const tracker = new ArrayTracker([5, 3, 1], MOCK_LINE_MAP);
      tracker.shrinkWindow({});

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.windowRange).toBeDefined();
    });
  });

  describe("visit", () => {
    it("increments visit metric", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.visit(0, {});
      tracker.visit(1, {});

      const steps = tracker.getSteps();
      expect(steps[1]!.metrics.visits).toBe(2);
    });

    it("includes currentIndex pointer", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.visit(1, { reason: "scan" });

      const steps = tracker.getSteps();
      const visualState = steps[0]!.visualState as ArrayVisualState;
      expect(visualState.pointers).toEqual({ currentIndex: 1 });
    });
  });

  describe("complete", () => {
    it("produces a complete step", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.complete({ result: "done" });

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(1);
      expect(steps[0]!.type).toBe("complete");
    });
  });

  describe("step index accumulation", () => {
    it("has incrementing step indices across all operations", () => {
      const tracker = new ArrayTracker([5, 3, 1, 8], MOCK_LINE_MAP);
      tracker.initialize({});
      tracker.compareTwo(0, 3, {});
      tracker.swap(0, 1, {});
      tracker.markElement(2, "found", {});
      tracker.visit(3, {});
      tracker.complete({});

      const steps = tracker.getSteps();
      expect(steps).toHaveLength(6);
      for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
        expect(steps[stepIndex]!.index).toBe(stepIndex);
      }
    });
  });

  describe("highlighted lines from line map", () => {
    it("resolves correct lines for compare step type", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.compareTwo(0, 1, {});

      const steps = tracker.getSteps();
      const tsHighlight = steps[0]!.highlightedLines.find(
        (highlight) => highlight.language === "typescript",
      );
      expect(tsHighlight?.lines).toEqual([3, 4]);
    });

    it("resolves correct lines for swap step type", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      tracker.swap(0, 1, {});

      const steps = tracker.getSteps();
      const tsHighlight = steps[0]!.highlightedLines.find(
        (highlight) => highlight.language === "typescript",
      );
      expect(tsHighlight?.lines).toEqual([5, 6]);
    });
  });

  describe("variables independence", () => {
    it("produces snapshot variables that are independent copies", () => {
      const tracker = new ArrayTracker([5, 3], MOCK_LINE_MAP);
      const variables = { currentIndex: 0 };
      tracker.visit(0, variables);

      variables.currentIndex = 99;

      const steps = tracker.getSteps();
      expect(steps[0]!.variables.currentIndex).toBe(0);
    });
  });
});
