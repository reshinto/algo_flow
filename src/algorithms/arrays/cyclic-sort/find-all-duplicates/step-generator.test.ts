import { describe, it, expect } from "vitest";
import { generateFindAllDuplicatesSteps } from "./step-generator";

describe("generateFindAllDuplicatesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("all steps have array visual state kind", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles empty array gracefully", () => {
    const steps = generateFindAllDuplicatesSteps({ inputArray: [] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("complete step variables contain duplicates array", () => {
    const steps = generateFindAllDuplicatesSteps({
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.variables).toHaveProperty("duplicates");
    const vars = lastStep.variables as { duplicates: number[] };
    expect(vars.duplicates.sort()).toEqual([2, 3]);
  });

  it("includes compare steps for each array element", () => {
    const steps = generateFindAllDuplicatesSteps({ inputArray: [1, 2, 2] });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("produces at least one step per array element plus initialize and complete", () => {
    const inputArray = [4, 3, 2, 7, 8, 2, 3, 1];
    const steps = generateFindAllDuplicatesSteps({ inputArray });
    expect(steps.length).toBeGreaterThanOrEqual(inputArray.length + 2);
  });
});
