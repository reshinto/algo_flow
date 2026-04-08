import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { gameOfLife } from "./sources/game-of-life.ts?fn";
import { generateGameOfLifeSteps } from "./step-generator";
import type { GameOfLifeInput } from "./step-generator";
import { gameOfLifeEducational } from "./educational";

import typescriptSource from "./sources/game-of-life.ts?raw";
import pythonSource from "./sources/game-of-life.py?raw";
import javaSource from "./sources/GameOfLife.java?raw";
import rustSource from "./sources/game-of-life.rs?raw";
import cppSource from "./sources/GameOfLife.cpp?raw";
import goSource from "./sources/game-of-life.go?raw";

function executeGameOfLife(input: GameOfLifeInput): number[][] {
  const boardCopy = input.board.map((row) => [...row]);
  return gameOfLife(boardCopy) as number[][];
}

const gameOfLifeDefinition: AlgorithmDefinition<GameOfLifeInput> = {
  meta: {
    id: ALGORITHM_ID.GAME_OF_LIFE!,
    name: "Game of Life",
    category: CATEGORY.MATRICES!,
    technique: "transformation",
    description:
      "Simulate one step of Conway's Game of Life — update all cells simultaneously based on neighbor count — O(m × n) time, O(1) space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      board: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    },
  },
  execute: executeGameOfLife,
  generateSteps: generateGameOfLifeSteps,
  educational: gameOfLifeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(gameOfLifeDefinition);
