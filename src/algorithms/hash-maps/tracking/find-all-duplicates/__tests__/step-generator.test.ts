import { describe, it, expect } from "vitest";
import { generateFindAllDuplicatesSteps } from "../step-generator";

describe("generateFindAllDuplicatesSteps", () => {
  it("produces steps", () => {
    expect(
      generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] }).length,
    ).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    expect(generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] })[0]?.type).toBe(
      "initialize",
    );
  });
  it("ends with complete", () => {
    const steps = generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("has hash-map visual states", () => {
    for (const step of generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] })) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
  it("emits check-duplicate steps", () => {
    expect(
      generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] }).filter(
        (s) => s.type === "check-duplicate",
      ).length,
    ).toBe(8);
  });
  it("emits key-found for duplicates", () => {
    expect(
      generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] }).filter(
        (s) => s.type === "key-found",
      ).length,
    ).toBe(2);
  });
  it("sets result", () => {
    const steps = generateFindAllDuplicatesSteps({ numbers: [4, 3, 2, 7, 8, 2, 3, 1] });
    const last = steps[steps.length - 1]!;
    if (last.visualState.kind === "hash-map") {
      expect(last.visualState.result).toEqual([2, 3]);
    }
  });
});
