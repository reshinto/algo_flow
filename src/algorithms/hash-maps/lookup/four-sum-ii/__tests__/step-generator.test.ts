import { describe, it, expect } from "vitest";
import { generateFourSumIISteps } from "../step-generator";

describe("generateFourSumIISteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits insert-key steps during phase 1", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits key-found steps when complement exists in the map", () => {
    const steps = generateFourSumIISteps({
      numsA: [1, 2],
      numsB: [-2, -1],
      numsC: [-1, 2],
      numsD: [0, 2],
    });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("produces no key-found steps when no zero-sum quadruples exist", () => {
    const steps = generateFourSumIISteps({
      numsA: [1],
      numsB: [2],
      numsC: [3],
      numsD: [4],
    });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBe(0);
  });
});
