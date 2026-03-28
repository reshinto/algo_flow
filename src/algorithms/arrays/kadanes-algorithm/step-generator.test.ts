import { describe, it, expect } from "vitest";
import { generateKadanesSteps } from "./step-generator";

describe("generateKadanesSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4, -1, 2, 1],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4, -1, 2, 1],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4, -1, 2, 1],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps for extend-vs-restart decisions", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    /* 4 elements - 1 (first element is init) = 3 comparisons */
    expect(compareSteps.length).toBe(3);
  });

  it("includes move-window steps for extend and restart actions", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4],
    });
    const moveWindowSteps = steps.filter((step) => step.type === "move-window");
    /* 1 initial + 3 for each remaining element = 4 */
    expect(moveWindowSteps.length).toBe(4);
  });

  it("includes visit steps for global max tracking", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    /* One visit per element after the first = 3 */
    expect(visitSteps.length).toBe(3);
  });

  it("handles empty array gracefully", () => {
    const steps = generateKadanesSteps({
      inputArray: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateKadanesSteps({
      inputArray: [-2, 1, -3, 4, -1, 2, 1],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes expected variables in compare steps", () => {
    const steps = generateKadanesSteps({
      inputArray: [3, -1, 5],
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("extendSum");
    expect(compareStep?.variables).toHaveProperty("restartSum");
    expect(compareStep?.variables).toHaveProperty("decision");
  });

  it("includes expected variables in complete step", () => {
    const steps = generateKadanesSteps({
      inputArray: [3, -1, 5],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("maxSum");
    expect(completeStep?.variables).toHaveProperty("startIndex");
    expect(completeStep?.variables).toHaveProperty("endIndex");
  });
});
