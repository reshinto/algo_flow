import { describe, it, expect } from "vitest";
import { generateRomanToIntegerSteps } from "../step-generator";

describe("generateRomanToIntegerSteps", () => {
  it("produces steps for the default input MCMXCIV", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits exactly 7 insert-key steps for the 7 Roman symbols", () => {
    const steps = generateRomanToIntegerSteps({ text: "III" });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBe(7);
  });

  it("emits a lookup-key step for each character in the input", () => {
    const steps = generateRomanToIntegerSteps({ text: "XIV" });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBe(3);
  });

  it("sets the result to 1994 for MCMXCIV", () => {
    const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(1994);
    }
  });

  it("sets the result to 4 for IV", () => {
    const steps = generateRomanToIntegerSteps({ text: "IV" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(4);
    }
  });

  it("emits visit steps for each character in the input", () => {
    const steps = generateRomanToIntegerSteps({ text: "VII" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(3);
  });
});
