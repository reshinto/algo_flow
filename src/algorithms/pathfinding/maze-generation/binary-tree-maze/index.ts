import type { AlgorithmDefinition, GridCell } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY, GRID_DEFAULTS } from "@/utils/constants";

import { binaryTreeMaze } from "./sources/binary-tree-maze.ts?fn";
import { generateBinaryTreeMazeSteps } from "./step-generator";
import { binaryTreeMazeEducational } from "./educational";

import typescriptSource from "./sources/binary-tree-maze.ts?raw";
import pythonSource from "./sources/binary-tree-maze.py?raw";
import javaSource from "./sources/BinaryTreeMaze.java?raw";
import rustSource from "./sources/binary-tree-maze.rs?raw";
import cppSource from "./sources/BinaryTreeMaze.cpp?raw";
import goSource from "./sources/binary-tree-maze.go?raw";

/** Builds an all-walls grid for maze generation with start/end positions marked. */
function createDefaultGrid(): GridCell[][] {
  const { rows, cols, startPosition, endPosition } = GRID_DEFAULTS;
  const grid: GridCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: GridCell[] = [];
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let cellType: GridCell["type"] = "wall";
      if (rowIndex === startPosition[0] && colIndex === startPosition[1]) {
        cellType = "start";
      } else if (rowIndex === endPosition[0] && colIndex === endPosition[1]) {
        cellType = "end";
      }
      row.push({
        row: rowIndex,
        col: colIndex,
        type: cellType,
        state: "default",
      });
    }
    grid.push(row);
  }

  return grid;
}

interface MazeInput {
  grid: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
}

const defaultGrid = createDefaultGrid();

const binaryTreeMazeDefinition: AlgorithmDefinition<MazeInput> = {
  meta: {
    id: ALGORITHM_ID.BINARY_TREE_MAZE!,
    name: "Binary Tree Maze",
    category: CATEGORY.PATHFINDING!,
    technique: "maze-generation",
    description:
      "The simplest maze algorithm — for each cell, randomly carve north or east with O(1) memory, producing a perfect maze with a characteristic diagonal bias",
    timeComplexity: {
      best: "O(V)",
      average: "O(V)",
      worst: "O(V)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      grid: defaultGrid,
      startPosition: [...GRID_DEFAULTS.startPosition],
      endPosition: [...GRID_DEFAULTS.endPosition],
    },
  },
  execute: (input: MazeInput) => binaryTreeMaze(input.grid),
  generateSteps: generateBinaryTreeMazeSteps,
  educational: binaryTreeMazeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(binaryTreeMazeDefinition);
