/** Registry entry for Levenshtein Distance — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { levenshteinDistance } from "./sources/levenshtein-distance.ts?fn";
import { generateLevenshteinDistanceSteps } from "./step-generator";
import type { LevenshteinDistanceInput } from "./step-generator";
import { levenshteinDistanceEducational } from "./educational";

import typescriptSource from "./sources/levenshtein-distance.ts?raw";
import pythonSource from "./sources/levenshtein-distance.py?raw";
import javaSource from "./sources/LevenshteinDistance.java?raw";
import rustSource from "./sources/levenshtein-distance.rs?raw";
import cppSource from "./sources/LevenshteinDistance.cpp?raw";
import goSource from "./sources/levenshtein-distance.go?raw";

function executeLevenshteinDistance(input: LevenshteinDistanceInput): number {
  return levenshteinDistance(input.source, input.target) as number;
}

const levenshteinDistanceDefinition: AlgorithmDefinition<LevenshteinDistanceInput> = {
  meta: {
    id: ALGORITHM_ID.LEVENSHTEIN_DISTANCE!,
    name: "Levenshtein Distance",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Compute the minimum number of insertions, deletions, and replacements to transform one string into another using dynamic programming",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(nm)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { source: "kitten", target: "sitting" },
  },
  execute: executeLevenshteinDistance,
  generateSteps: generateLevenshteinDistanceSteps,
  educational: levenshteinDistanceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(levenshteinDistanceDefinition);
