/**
 * Tournament Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { tournamentSort } from "./sources/tournament-sort.ts?fn";
import { generateTournamentSortSteps } from "./step-generator";
import { tournamentSortEducational } from "./educational";

import typescriptSource from "./sources/tournament-sort.ts?raw";
import pythonSource from "./sources/tournament-sort.py?raw";
import javaSource from "./sources/TournamentSort.java?raw";
import rustSource from "./sources/tournament-sort.rs?raw";
import cppSource from "./sources/TournamentSort.cpp?raw";
import goSource from "./sources/tournament-sort.go?raw";

const tournamentSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.TOURNAMENT_SORT!,
    name: "Tournament Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Builds a tournament tree to find the minimum repeatedly — each extraction takes O(log n) after an O(n) tree construction",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [4, 2, 7, 1, 5, 3, 6],
  },
  execute: tournamentSort,
  generateSteps: generateTournamentSortSteps,
  educational: tournamentSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(tournamentSortDefinition);
