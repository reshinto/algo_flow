import { describe, it, expect } from "vitest";
import { generateSetCoverSteps } from "./step-generator";

const defaultInput = {
  universe: [1, 2, 3, 4, 5, 6, 7, 8],
  sets: [
    [1, 2, 3],
    [2, 4],
    [3, 4, 5],
    [5, 6, 7],
    [6, 7, 8],
  ],
};

describe("generateSetCoverSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSetCoverSteps(defaultInput);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSetCoverSteps(defaultInput);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSetCoverSteps(defaultInput);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateSetCoverSteps(defaultInput);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSetCoverSteps(defaultInput);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits visit steps for evaluate-set operations", () => {
    const steps = generateSetCoverSteps(defaultInput);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("emits select-set steps equal to the number of rounds", () => {
    const steps = generateSetCoverSteps(defaultInput);
    const selectSteps = steps.filter((step) => step.type === "select-set");
    // Must have at least one selection
    expect(selectSteps.length).toBeGreaterThan(0);
    // Greedy needs at most |universe| rounds
    expect(selectSteps.length).toBeLessThanOrEqual(defaultInput.universe.length);
  });

  it("complete step has chosenSets covering all universe elements", () => {
    const steps = generateSetCoverSteps(defaultInput);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("set");
    if (completeStep.visualState.kind === "set") {
      const coveredElements = new Set(completeStep.visualState.chosenSets!.flat());
      for (const element of defaultInput.universe) {
        expect(coveredElements.has(element)).toBe(true);
      }
    }
  });

  it("uncoveredElements shrinks to zero by the complete step", () => {
    const steps = generateSetCoverSteps(defaultInput);
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.uncoveredElements!.length).toBe(0);
    }
  });

  it("handles a single-element universe", () => {
    const steps = generateSetCoverSteps({ universe: [5], sets: [[5]] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles empty universe with no steps between initialize and complete", () => {
    const steps = generateSetCoverSteps({ universe: [], sets: [[1, 2]] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const selectSteps = steps.filter((step) => step.type === "select-set");
    expect(selectSteps.length).toBe(0);
  });

  it("chosenSets grows with each select-set step", () => {
    const steps = generateSetCoverSteps(defaultInput);
    const selectSteps = steps.filter((step) => step.type === "select-set");
    for (let selIdx = 0; selIdx < selectSteps.length; selIdx++) {
      const step = selectSteps[selIdx]!;
      if (step.visualState.kind === "set") {
        expect(step.visualState.chosenSets!.length).toBe(selIdx + 1);
      }
    }
  });
});
