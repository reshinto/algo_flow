/** Step generation tests for the String Compression algorithm. */

import { describe, it, expect } from "vitest";
import { generateStringCompressionSteps } from "./step-generator";

describe("generateStringCompressionSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits read-char steps for each run group", () => {
    // "aabcccccaaa" has 4 runs: aa, b, ccccc, aaa → 4 read-char steps
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const readSteps = steps.filter((step) => step.type === "read-char");
    expect(readSteps.length).toBe(4);
  });

  it("emits write-char steps for each character and count written", () => {
    // "aabcccccaaa" → "a2b1c5a3" — 8 write-char steps (one per output character)
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBe(8);
  });

  it("final complete step carries the compressed result", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("a2b1c5a3");
  });

  it("complete step carries the original when compression yields no benefit", () => {
    // "abc" → "a1b1c1" (6 > 3 chars), so original is returned
    const steps = generateStringCompressionSteps({ text: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("abc");
  });

  it("produces only initialize and complete steps for an empty string", () => {
    const steps = generateStringCompressionSteps({ text: "" });
    expect(steps.length).toBe(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces no swap-pointer steps (not used for compression)", () => {
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const swapSteps = steps.filter((step) => step.type === "swap-pointers");
    expect(swapSteps.length).toBe(0);
  });

  it("emits found (markConverted) steps for each run", () => {
    // 4 runs in "aabcccccaaa" → 4 found steps
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(4);
  });

  it("records swaps metric equal to total output characters written", () => {
    // "aabcccccaaa" → "a2b1c5a3" — 8 writeChar calls increment swaps metric
    const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.metrics.swaps).toBe(8);
  });
});
