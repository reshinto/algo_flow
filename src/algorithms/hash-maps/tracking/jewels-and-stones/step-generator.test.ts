import { describe, it, expect } from "vitest";
import { generateJewelsAndStonesSteps } from "./step-generator";

describe("generateJewelsAndStonesSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-key steps for each jewel character", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(2);
  });

  it("emits lookup-key steps for each stone", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBe(7);
  });

  it("sets result to 3 for the default input", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(3);
    }
  });

  it("sets result to 0 when no stones match", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "z", stones: "aaa" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("emits key-found steps for matching stones", () => {
    const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });
    const keyFoundSteps = steps.filter((step) => step.type === "key-found");
    expect(keyFoundSteps.length).toBe(6);
  });
});
