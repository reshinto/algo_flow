import { describe, it, expect } from "vitest";
import { generateWordPatternSteps } from "./step-generator";

describe("generateWordPatternSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits insert-key steps when new mappings are created", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits key-found steps when existing mapping is confirmed", () => {
    const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("terminates early on mismatch", () => {
    const matchingSteps = generateWordPatternSteps({
      pattern: "abba",
      sentence: "dog cat cat dog",
    });
    const mismatchSteps = generateWordPatternSteps({
      pattern: "abba",
      sentence: "dog cat cat fish",
    });
    expect(mismatchSteps.length).toBeLessThanOrEqual(matchingSteps.length);
  });

  it("terminates immediately when pattern length differs from word count", () => {
    const steps = generateWordPatternSteps({ pattern: "abc", sentence: "dog cat" });
    expect(steps.length).toBeLessThanOrEqual(3);
  });
});
