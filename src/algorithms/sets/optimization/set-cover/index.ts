import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setCover } from "./sources/set-cover.ts?fn";
import { generateSetCoverSteps } from "./step-generator";
import type { SetCoverInput } from "./step-generator";
import { setCoverEducational } from "./educational";

import typescriptSource from "./sources/set-cover.ts?raw";
import pythonSource from "./sources/set-cover.py?raw";
import javaSource from "./sources/SetCover.java?raw";
import rustSource from "./sources/set-cover.rs?raw";
import cppSource from "./sources/SetCover.cpp?raw";
import goSource from "./sources/set-cover.go?raw";

function executeSetCover(input: SetCoverInput): {
  selectedIndices: number[];
  selectedSets: number[][];
} {
  return setCover(input.universe, input.sets) as {
    selectedIndices: number[];
    selectedSets: number[][];
  };
}

const setCoverDefinition: AlgorithmDefinition<SetCoverInput> = {
  meta: {
    id: ALGORITHM_ID.SET_COVER!,
    name: "Set Cover",
    category: CATEGORY.SETS!,
    technique: "optimization",
    description:
      "Greedy approximation for the NP-hard Set Cover problem — repeatedly select the subset covering the most uncovered elements until the universe is fully covered, achieving a ln(n)+1 approximation ratio",
    timeComplexity: {
      best: "O(n × m)",
      average: "O(n × m)",
      worst: "O(n × m)",
    },
    spaceComplexity: "O(n + m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      universe: [1, 2, 3, 4, 5, 6, 7, 8],
      sets: [
        [1, 2, 3],
        [2, 4],
        [3, 4, 5],
        [5, 6, 7],
        [6, 7, 8],
      ],
    },
  },
  execute: executeSetCover,
  generateSteps: generateSetCoverSteps,
  educational: setCoverEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setCoverDefinition);
