import { describe, it, expect } from "vitest";
import { generateAsteroidCollisionSteps } from "./step-generator";

describe("generateAsteroidCollisionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for surviving asteroids", () => {
    // [5, 10, -5]: 5 and 10 survive, -5 is destroyed — two pushes
    const steps = generateAsteroidCollisionSteps({ asteroids: [5, 10, -5] });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(2);
  });

  it("emits a resolve step when two equal asteroids destroy each other", () => {
    // [8, -8]: both explode — one resolve step
    const steps = generateAsteroidCollisionSteps({ asteroids: [8, -8] });
    const resolveSteps = steps.filter((step) => step.type === "resolve");
    expect(resolveSteps.length).toBe(1);
  });

  it("emits maintain-monotonic steps when the stack top is destroyed in a collision", () => {
    // [10, 2, -5]: -5 destroys 2 (stack top smaller) via maintainMonotonic
    const steps = generateAsteroidCollisionSteps({ asteroids: [10, 2, -5] });
    const maintainSteps = steps.filter((step) => step.type === "maintain-monotonic");
    expect(maintainSteps.length).toBeGreaterThan(0);
  });

  it("produces no collision steps when all asteroids move in the same direction", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [-2, -1, 1, 2] });
    const maintainSteps = steps.filter((step) => step.type === "maintain-monotonic");
    const resolveSteps = steps.filter((step) => step.type === "resolve");
    expect(maintainSteps.length).toBe(0);
    expect(resolveSteps.length).toBe(0);
  });

  it("handles an empty asteroid array", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("final visual state stack is empty when all asteroids cancel out", () => {
    const steps = generateAsteroidCollisionSteps({ asteroids: [8, -8] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("stack-queue");
    if (lastStep.visualState.kind === "stack-queue") {
      expect(lastStep.visualState.stackElements.length).toBe(0);
    }
  });
});
