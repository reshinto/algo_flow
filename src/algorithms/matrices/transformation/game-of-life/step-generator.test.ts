import { describe, it, expect } from "vitest";
import { generateGameOfLifeSteps } from "./step-generator";

const DEFAULT_BOARD = [
  [0, 1, 0],
  [0, 0, 1],
  [1, 1, 1],
  [0, 0, 0],
];

describe("generateGameOfLifeSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits mark-cell steps for every cell during the neighbor-counting phase", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    const markSteps = steps.filter((step) => step.type === "mark-cell");
    // 4×3 board = 12 cells → 12 mark-cell steps
    expect(markSteps.length).toBe(12);
  });

  it("emits flip-cell steps for every cell during the decoding phase", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    const flipSteps = steps.filter((step) => step.type === "flip-cell");
    // 4×3 board = 12 cells → 12 flip-cell steps
    expect(flipSteps.length).toBe(12);
  });

  it("final visual state reflects the correctly updated board", () => {
    const steps = generateGameOfLifeSteps({ board: DEFAULT_BOARD });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("matrix");
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [0, 0, 0],
        [1, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ]);
    }
  });

  it("handles a blinker oscillator correctly", () => {
    const board = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const steps = generateGameOfLifeSteps({ board });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "matrix") {
      const finalValues = completeStep.visualState.cells.map((row) =>
        row.map((cell) => cell.value),
      );
      expect(finalValues).toEqual([
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]);
    }
  });

  it("does not mutate the original input board", () => {
    const board = [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ];
    const originalSnapshot = board.map((row) => [...row]);
    generateGameOfLifeSteps({ board });
    expect(board).toEqual(originalSnapshot);
  });
});
