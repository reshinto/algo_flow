import { describe, it, expect } from "vitest";
import { generateWordBreakTabulationSteps } from "./step-generator";

describe("generateWordBreakTabulationSteps", () => {
  it("produces steps for the default input 'leetcode'", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes exactly one fill-table step for the base case W(0)=1", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBe(1);
  });

  it("records result=true in the complete step for 'leetcode'", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(true);
  });

  it("records result=false in the complete step for 'catsandog'", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "catsandog",
      dictionary: ["cats", "dog", "sand", "and", "cat"],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(false);
  });

  it("has strictly incrementing step indices", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes read-cache steps for each position-word pair where endIndex >= word.length", () => {
    const text = "leetcode";
    const dictionary = ["leet", "code"];
    const steps = generateWordBreakTabulationSteps({ text, dictionary });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("includes compute-cell steps — one per endIndex-word pair", () => {
    const text = "leetcode";
    const dictionary = ["leet", "code"];
    const steps = generateWordBreakTabulationSteps({ text, dictionary });
    // textLength * dictionarySize compute-cell steps
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBe(text.length * dictionary.length);
  });

  it("handles empty text — initialize then complete with result true", () => {
    const steps = generateWordBreakTabulationSteps({ text: "", dictionary: ["a"] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.variables?.result).toBe(true);
  });

  it("handles 'applepenapple' — result is true", () => {
    const steps = generateWordBreakTabulationSteps({
      text: "applepenapple",
      dictionary: ["apple", "pen"],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(true);
  });

  it("handles single-word text matching the dictionary — result is true", () => {
    const steps = generateWordBreakTabulationSteps({ text: "leet", dictionary: ["leet", "code"] });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.result).toBe(true);
  });
});
