import { describe, it, expect } from "vitest";
import { generateNumberOfGoodPairsSteps } from "./step-generator";

describe("generateNumberOfGoodPairsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing indices", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits increment-count steps", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe(6);
  });

  it("emits key-found steps for pairs", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("sets result to 4", () => {
    const steps = generateNumberOfGoodPairsSteps({ numbers: [1, 2, 3, 1, 1, 3] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(4);
    }
  });
});
