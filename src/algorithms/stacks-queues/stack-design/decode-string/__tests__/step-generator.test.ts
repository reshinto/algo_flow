import { describe, it, expect } from "vitest";
import { generateDecodeStringSteps } from "../step-generator";

describe("generateDecodeStringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for each opening bracket", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    const pushSteps = steps.filter((step) => step.type === "push");
    // Two '[' characters in "3[a2[c]]"
    expect(pushSteps.length).toBe(2);
  });

  it("emits match steps for each closing bracket", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    const matchSteps = steps.filter((step) => step.type === "match");
    // Two ']' characters in "3[a2[c]]"
    expect(matchSteps.length).toBe(2);
  });

  it("encodes the decoded result in the complete step variables", () => {
    const steps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ decodedResult: "accaccacc" });
  });

  it("handles a plain string with no brackets", () => {
    const steps = generateDecodeStringSteps({ inputString: "abc" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ decodedResult: "abc" });
  });

  it("handles an empty string", () => {
    const steps = generateDecodeStringSteps({ inputString: "" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles multiple top-level groups", () => {
    const steps = generateDecodeStringSteps({ inputString: "2[abc]3[cd]ef" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ decodedResult: "abcabccdcdcdef" });
  });
});
