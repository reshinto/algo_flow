import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { redBlackInsert } from "./sources/red-black-insert.ts?fn";
import { generateRedBlackInsertSteps } from "./step-generator";
import type { RedBlackInsertInput } from "./step-generator";
import { redBlackInsertEducational } from "./educational";

import typescriptSource from "./sources/red-black-insert.ts?raw";
import pythonSource from "./sources/red-black-insert.py?raw";
import javaSource from "./sources/RedBlackInsert.java?raw";
import rustSource from "./sources/red-black-insert.rs?raw";
import cppSource from "./sources/RedBlackInsert.cpp?raw";
import goSource from "./sources/red-black-insert.go?raw";

function executeRedBlackInsert(input: RedBlackInsertInput): number[] {
  return redBlackInsert(input.values) as number[];
}

const redBlackInsertDefinition: AlgorithmDefinition<RedBlackInsertInput> = {
  meta: {
    id: ALGORITHM_ID.RED_BLACK_INSERT!,
    name: "Red-Black Tree Insert",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Insert values into a Red-Black tree with color fixes and rotations to maintain the red-black invariants",
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [7, 3, 18, 10, 22, 8, 11, 26] },
  },
  execute: executeRedBlackInsert,
  generateSteps: generateRedBlackInsertSteps,
  educational: redBlackInsertEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(redBlackInsertDefinition);
