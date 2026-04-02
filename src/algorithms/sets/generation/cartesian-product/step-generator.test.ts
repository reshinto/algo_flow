import { describe, it, expect } from "vitest";
import { generateCartesianProductSteps } from "./step-generator";

describe("generateCartesianProductSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits exactly n×m generate-pair steps", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    const pairSteps = steps.filter((step) => step.type === "generate-pair");
    expect(pairSteps.length).toBe(6);
  });

  it("generates correct total pairs for 2×2 input", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2], setB: [3, 4] });
    const pairSteps = steps.filter((step) => step.type === "generate-pair");
    expect(pairSteps.length).toBe(4);
  });

  it("accumulates all pairs in the final complete step", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [4, 5] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.generatedSets).toHaveLength(6);
    }
  });

  it("handles single-element sets producing one pair", () => {
    const steps = generateCartesianProductSteps({ setA: [7], setB: [9] });
    const pairSteps = steps.filter((step) => step.type === "generate-pair");
    expect(pairSteps.length).toBe(1);
  });

  it("produces zero pair steps when setA is empty", () => {
    const steps = generateCartesianProductSteps({ setA: [], setB: [4, 5] });
    const pairSteps = steps.filter((step) => step.type === "generate-pair");
    expect(pairSteps.length).toBe(0);
  });

  it("produces zero pair steps when setB is empty", () => {
    const steps = generateCartesianProductSteps({ setA: [1, 2, 3], setB: [] });
    const pairSteps = steps.filter((step) => step.type === "generate-pair");
    expect(pairSteps.length).toBe(0);
  });
});
