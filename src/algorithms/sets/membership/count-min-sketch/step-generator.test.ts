import { describe, it, expect } from "vitest";
import { generateCountMinSketchSteps } from "./step-generator";

const defaultInput = {
  elements: [3, 3, 7, 7, 7, 11],
  queries: [3, 7, 11, 5],
  width: 8,
  depth: 3,
};

describe("generateCountMinSketchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits hash-element steps for each element inserted", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const hashSteps = steps.filter((step) => step.type === "hash-element");
    expect(hashSteps.length).toBe(defaultInput.elements.length);
  });

  it("emits increment-count steps for each element × depth", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe(defaultInput.elements.length * defaultInput.depth);
  });

  it("emits check-membership steps for each query", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const querySteps = steps.filter((step) => step.type === "check-membership");
    expect(querySteps.length).toBe(defaultInput.queries.length);
  });

  it("emits member-found for elements that were inserted", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const foundSteps = steps.filter((step) => step.type === "member-found");
    // queries [3, 7, 11] were all inserted; [5] was not
    expect(foundSteps.length).toBe(3);
  });

  it("emits member-not-found for element 5 which was never inserted", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const notFoundSteps = steps.filter((step) => step.type === "member-not-found");
    expect(notFoundSteps.length).toBe(1);
  });

  it("produces more increment-count steps for larger depth", () => {
    const shallowSteps = generateCountMinSketchSteps({ ...defaultInput, depth: 2 });
    const deepSteps = generateCountMinSketchSteps({ ...defaultInput, depth: 5 });
    const shallowIncrements = shallowSteps.filter((step) => step.type === "increment-count").length;
    const deepIncrements = deepSteps.filter((step) => step.type === "increment-count").length;
    expect(deepIncrements).toBeGreaterThan(shallowIncrements);
  });

  it("handles empty elements array without errors", () => {
    const steps = generateCountMinSketchSteps({ ...defaultInput, elements: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles empty queries array without errors", () => {
    const steps = generateCountMinSketchSteps({ ...defaultInput, queries: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("sketchGrid in visual state has depth rows after all insertions", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.sketchGrid!.length).toBe(defaultInput.depth);
    }
  });

  it("sketchGrid rows have width columns", () => {
    const steps = generateCountMinSketchSteps(defaultInput);
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      for (const row of completeStep.visualState.sketchGrid!) {
        expect(row.length).toBe(defaultInput.width);
      }
    }
  });
});
