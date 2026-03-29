import { describe, it, expect } from "vitest";
import { generateCountAnagramWindowsSteps } from "./step-generator";

describe("generateCountAnagramWindowsSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states throughout", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes move-window step for initial window build", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    });
    const moveSteps = steps.filter((step) => step.type === "move-window");
    expect(moveSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes shrink and expand steps during sliding", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1],
      pattern: [1, 2, 3],
    });
    const shrinkSteps = steps.filter((step) => step.type === "shrink-window");
    const expandSteps = steps.filter((step) => step.type === "expand-window");
    /* 6 elements, pattern length 3: 3 slides */
    expect(shrinkSteps.length).toBe(3);
    expect(expandSteps.length).toBe(3);
  });

  it("handles empty text gracefully", () => {
    const steps = generateCountAnagramWindowsSteps({ text: [], pattern: [1, 2] });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles pattern longer than text gracefully", () => {
    const steps = generateCountAnagramWindowsSteps({ text: [1], pattern: [1, 2] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateCountAnagramWindowsSteps({
      text: [1, 2, 3, 1, 2, 1],
      pattern: [1, 2, 3],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
