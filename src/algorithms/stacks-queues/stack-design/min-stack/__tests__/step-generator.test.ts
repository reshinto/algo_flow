import { describe, it, expect } from "vitest";
import { generateMinStackSteps } from "../step-generator";

describe("generateMinStackSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each element", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(5);
  });

  it("emits a push step (main stack) for each element", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const pushSteps = steps.filter((step) => step.type === "push");
    // Each element gets a main push + auxiliary push = 2 push-type steps per element
    // push steps for main stack (type "push") = 5
    // auxiliary pushes use lineMapKey "push-auxiliary" but also type "push"
    expect(pushSteps.length).toBe(10);
  });

  it("emits a compare step for each element", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBe(5);
  });

  it("emits a peek step at the end", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const peekSteps = steps.filter((step) => step.type === "peek");
    expect(peekSteps.length).toBe(1);
  });

  it("records the final minimum in the complete step variables", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["finalMin"]).toBe(1);
  });

  it("tracks the auxiliary stack in the visual state", () => {
    const steps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState;
    if (visualState.kind === "stack-queue") {
      expect(visualState.auxiliaryStack).toBeDefined();
      expect(visualState.auxiliaryStack?.length).toBeGreaterThan(0);
    }
  });

  it("works correctly for a single-element input", () => {
    const steps = generateMinStackSteps({ values: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
