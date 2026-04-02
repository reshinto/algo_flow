import { describe, it, expect } from "vitest";
import { generatePowerSetSteps } from "./step-generator";

describe("generatePowerSetSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3, 4] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits 2^n generate-subset steps for n elements", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(8);
  });

  it("emits 2^n generate-subset steps for 4 elements", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3, 4] });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(16);
  });

  it("emits visit steps when elements are added to subset", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("emits backtrack steps when elements are removed from subset", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2] });
    const backtrackSteps = steps.filter((step) => step.type === "backtrack");
    expect(backtrackSteps.length).toBeGreaterThan(0);
  });

  it("generates 1 subset step for empty input", () => {
    const steps = generatePowerSetSteps({ elements: [] });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(1);
  });

  it("the complete step reports the correct total generated count", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables?.totalGenerated).toBe(8);
  });

  it("emits subsets with progressively growing sets in visual state", () => {
    const steps = generatePowerSetSteps({ elements: [1, 2, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.generatedSets!.length).toBe(8);
    }
  });
});
