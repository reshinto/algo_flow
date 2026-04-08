import { describe, it, expect } from "vitest";
import { generateFirstUniqueCharacterSteps } from "../step-generator";

describe("generateFirstUniqueCharacterSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits increment-count steps during the building phase", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe("leetcode".length);
  });

  it("emits a key-found step when a unique character is discovered", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    const foundSteps = steps.filter((step) => step.type === "key-found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("sets result to -1 when no unique character exists", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "aabb" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(-1);
    }
  });

  it("sets result to 0 for 'leetcode' where l is first unique", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("emits lookup-key steps during the checking phase", () => {
    const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBeGreaterThan(0);
  });
});
