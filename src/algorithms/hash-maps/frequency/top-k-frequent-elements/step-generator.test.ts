import { describe, it, expect } from "vitest";
import { generateTopKFrequentElementsSteps } from "./step-generator";

describe("generateTopKFrequentElementsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits increment-count steps for each element in the input", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe(6);
  });

  it("emits exactly k key-found steps for the top k extraction phase", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    const keyFoundSteps = steps.filter((step) => step.type === "key-found");
    expect(keyFoundSteps.length).toBe(2);
  });

  it("sets the result array in the final complete step", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      const result = completeStep.visualState.result as number[];
      expect(result).toHaveLength(2);
      expect(result).toContain(1);
      expect(result).toContain(2);
    }
  });

  it("transitions through the building and extracting phases", () => {
    const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });
    const phases = steps
      .map((step) => (step.visualState.kind === "hash-map" ? step.visualState.phase : undefined))
      .filter(Boolean);
    expect(phases).toContain("building");
    expect(phases).toContain("extracting");
  });
});
