import { describe, it, expect } from "vitest";
import { generateGroupAnagramsSteps } from "./step-generator";

describe("generateGroupAnagramsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits insert-key steps for new anagram groups", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    const insertSteps = steps.filter((step) => step.type === "insert-key");
    // Three unique sorted keys: aet, ant, abt
    expect(insertSteps.length).toBe(3);
  });

  it("emits update-value steps when appending to existing groups", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    const updateSteps = steps.filter((step) => step.type === "update-value");
    // tea appends to aet, ate appends to aet, nat appends to ant = 3 updates
    expect(updateSteps.length).toBe(3);
  });

  it("emits a lookup-key step for every word processed", () => {
    const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const steps = generateGroupAnagramsSteps({ words });
    const lookupSteps = steps.filter((step) => step.type === "lookup-key");
    expect(lookupSteps.length).toBe(words.length);
  });

  it("sets groupResult in the final visual state", () => {
    const steps = generateGroupAnagramsSteps({
      words: ["eat", "tea", "tan", "ate", "nat", "bat"],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.groupResult).toBeDefined();
      expect(Object.keys(completeStep.visualState.groupResult!).length).toBe(3);
    }
  });
});
