import { describe, it, expect } from "vitest";
import { generateKCombinationsSteps } from "../step-generator";

describe("generateKCombinationsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits exactly C(5,3) = 10 generate-subset steps", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(10);
  });

  it("emits exactly C(4,2) = 6 generate-subset steps", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4], chooseK: 2 });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(6);
  });

  it("emits visit steps when elements are added to subset", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3], chooseK: 2 });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("emits backtrack steps when elements are removed from subset", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3], chooseK: 2 });
    const backtrackSteps = steps.filter((step) => step.type === "backtrack");
    expect(backtrackSteps.length).toBeGreaterThan(0);
  });

  it("reports correct totalGenerated in complete step", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables?.totalGenerated).toBe(10);
  });

  it("complete step stores all 10 generated combinations in visual state", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "set") {
      expect(completeStep.visualState.generatedSets!.length).toBe(10);
    }
  });

  it("generates 1 subset step when k equals 0 (empty subset base case)", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2, 3], chooseK: 0 });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(1);
  });

  it("generates 0 subset steps when k exceeds n", () => {
    const steps = generateKCombinationsSteps({ elements: [1, 2], chooseK: 5 });
    const subsetSteps = steps.filter((step) => step.type === "generate-subset");
    expect(subsetSteps.length).toBe(0);
  });
});
