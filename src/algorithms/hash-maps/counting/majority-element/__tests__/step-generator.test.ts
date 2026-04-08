import { describe, it, expect } from "vitest";
import { generateMajorityElementSteps } from "../step-generator";

describe("generateMajorityElementSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits increment-count steps", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBeGreaterThan(0);
  });

  it("emits a key-found step when majority is found", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("sets result in the final visual state", () => {
    const steps = generateMajorityElementSteps({ numbers: [2, 2, 1, 1, 1, 2, 2] });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(2);
    }
  });
});
