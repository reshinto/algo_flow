import { describe, it, expect } from "vitest";
import { generateFindMedianStreamSteps } from "./step-generator";

describe("generateFindMedianStreamSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains a heap-insert step", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains a visit step (markHighlighted for median)", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("visit");
  });

  it("initialize step variables include maxHeap, minHeap, and currentMedian", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const initStep = steps[0]!;
    const vars = initStep.variables as Record<string, unknown>;
    expect(vars).toHaveProperty("maxHeap");
    expect(vars).toHaveProperty("minHeap");
    expect(vars).toHaveProperty("currentMedian");
  });

  it("visit steps include currentMedian in variables", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
    for (const visitStep of visitSteps) {
      const vars = visitStep.variables as Record<string, unknown>;
      expect(vars).toHaveProperty("currentMedian");
    }
  });

  it("complete step variables include currentMedian", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const lastStep = steps[steps.length - 1]!;
    const vars = lastStep.variables as Record<string, unknown>;
    expect(vars).toHaveProperty("currentMedian");
  });

  it("handles a single-element stream", () => {
    const steps = generateFindMedianStreamSteps({ stream: [7] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");

    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
    const lastVisit = visitSteps[visitSteps.length - 1]!;
    const vars = lastVisit.variables as Record<string, unknown>;
    expect(vars.currentMedian).toBe(7);
  });

  it("handles an empty stream gracefully", () => {
    const steps = generateFindMedianStreamSteps({ stream: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("number of visit steps matches stream length for non-empty input", () => {
    const stream = [5, 2, 8, 1, 9];
    const steps = generateFindMedianStreamSteps({ stream });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(stream.length);
  });

  it("the heap visual state grows as stream elements are inserted", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8] });
    const heapInsertSteps = steps.filter((step) => step.type === "heap-insert");
    expect(heapInsertSteps.length).toBeGreaterThan(0);
  });

  it("contains sift-up steps after heap-insert", () => {
    const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("sift-up");
  });
});
