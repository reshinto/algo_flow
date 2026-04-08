import { describe, it, expect } from "vitest";
import { generateIntegerToRomanSteps } from "../step-generator";

describe("generateIntegerToRomanSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-key steps for value-symbol pairs", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(13);
  });

  it("emits lookup-key and key-found steps", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBeGreaterThan(0);
  });

  it("sets result to MCMXCIV for 1994", () => {
    const steps = generateIntegerToRomanSteps({ number: 1994 });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe("MCMXCIV");
    }
  });
});
