import { describe, it, expect } from "vitest";
import { generateMissingNumberSteps } from "../step-generator";

describe("generateMissingNumberSteps", () => {
  it("produces steps", () => {
    expect(generateMissingNumberSteps({ numbers: [3, 0, 1] }).length).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    expect(generateMissingNumberSteps({ numbers: [3, 0, 1] })[0]?.type).toBe("initialize");
  });
  it("ends with complete", () => {
    const steps = generateMissingNumberSteps({ numbers: [3, 0, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("has hash-map visual states", () => {
    for (const step of generateMissingNumberSteps({ numbers: [3, 0, 1] })) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateMissingNumberSteps({ numbers: [3, 0, 1] });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
  it("emits insert-key steps", () => {
    expect(
      generateMissingNumberSteps({ numbers: [3, 0, 1] }).filter((s) => s.type === "insert-key")
        .length,
    ).toBe(3);
  });
  it("emits lookup-key steps", () => {
    expect(
      generateMissingNumberSteps({ numbers: [3, 0, 1] }).filter((s) => s.type === "lookup-key")
        .length,
    ).toBeGreaterThan(0);
  });
  it("sets result to 2", () => {
    const steps = generateMissingNumberSteps({ numbers: [3, 0, 1] });
    const last = steps[steps.length - 1]!;
    if (last.visualState.kind === "hash-map") {
      expect(last.visualState.result).toBe(2);
    }
  });
});
