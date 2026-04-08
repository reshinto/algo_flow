import { describe, it, expect } from "vitest";
import { generateHappyNumberSteps } from "../step-generator";

describe("generateHappyNumberSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("sets result to true for happy number 19", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(true);
    }
  });

  it("sets result to false for unhappy number 4", () => {
    const steps = generateHappyNumberSteps({ number: 4 });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(false);
    }
  });

  it("emits insert-key steps during cycling", () => {
    const steps = generateHappyNumberSteps({ number: 19 });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits check-duplicate steps during cycling", () => {
    const steps = generateHappyNumberSteps({ number: 4 });
    const checkSteps = steps.filter((step) => step.type === "check-duplicate");
    expect(checkSteps.length).toBeGreaterThan(0);
  });

  it("emits a key-found step when cycle is detected for unhappy number", () => {
    const steps = generateHappyNumberSteps({ number: 4 });
    const keyFoundSteps = steps.filter((step) => step.type === "key-found");
    expect(keyFoundSteps.length).toBeGreaterThan(0);
  });
});
