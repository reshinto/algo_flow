import { describe, it, expect } from "vitest";
import { generateIsomorphicStringsSteps } from "./step-generator";

describe("generateIsomorphicStringsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-key steps for new mappings", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("sets result to true for isomorphic strings", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "egg", textB: "add" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(true);
    }
  });

  it("sets result to false for non-isomorphic strings", () => {
    const steps = generateIsomorphicStringsSteps({ textA: "foo", textB: "bar" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(false);
    }
  });
});
