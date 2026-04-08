import { describe, it, expect } from "vitest";
import { generateValidSudokuSteps } from "../step-generator";

const VALID_PARTIAL_BOARD = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const EMPTY_BOARD = Array.from({ length: 9 }, () => Array(9).fill(0) as number[]);

describe("generateValidSudokuSteps", () => {
  it("produces steps for the default valid board", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits verify-cell steps only for non-zero cells", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    const verifySteps = steps.filter((step) => step.type === "verify-cell");
    const nonZeroCells = VALID_PARTIAL_BOARD.flat().filter((val) => val !== 0).length;
    expect(verifySteps.length).toBe(nonZeroCells);
  });

  it("empty board produces no verify-cell steps", () => {
    const steps = generateValidSudokuSteps({ board: EMPTY_BOARD });
    const verifySteps = steps.filter((step) => step.type === "verify-cell");
    expect(verifySteps.length).toBe(0);
  });

  it("invalid board emits a failing verify-cell step before complete", () => {
    const board = EMPTY_BOARD.map((row) => [...row]);
    board[0]![0] = 5;
    board[0]![4] = 5; // duplicate 5 in row 0
    const steps = generateValidSudokuSteps({ board });
    const failStep = steps.find(
      (step) => step.type === "verify-cell" && step.description.includes("Duplicate"),
    );
    expect(failStep).toBeDefined();
  });

  it("valid board produces all passing verify-cell steps", () => {
    const steps = generateValidSudokuSteps({ board: VALID_PARTIAL_BOARD });
    const verifySteps = steps.filter((step) => step.type === "verify-cell");
    for (const step of verifySteps) {
      expect(step.description).not.toMatch(/Duplicate/);
    }
  });
});
