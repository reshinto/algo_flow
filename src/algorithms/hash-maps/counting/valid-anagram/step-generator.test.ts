import { describe, it, expect } from "vitest";
import { generateValidAnagramSteps } from "./step-generator";

describe("generateValidAnagramSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits increment-count steps for each char in textA", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe("anagram".length);
  });

  it("emits decrement-count steps for each char in textB", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    const decrementSteps = steps.filter((step) => step.type === "decrement-count");
    expect(decrementSteps.length).toBe("nagaram".length);
  });

  it("sets result to true for a valid anagram", () => {
    const steps = generateValidAnagramSteps({ textA: "anagram", textB: "nagaram" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(true);
    }
  });

  it("sets result to false for 'rat' and 'car'", () => {
    const steps = generateValidAnagramSteps({ textA: "rat", textB: "car" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(false);
    }
  });

  it("short-circuits immediately when lengths differ", () => {
    const steps = generateValidAnagramSteps({ textA: "ab", textB: "abc" });
    expect(steps.length).toBeLessThan(5);
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(false);
    }
  });
});
