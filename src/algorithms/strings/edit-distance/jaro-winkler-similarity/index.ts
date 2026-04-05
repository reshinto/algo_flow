/** Registry entry for Jaro-Winkler Similarity — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { jaroWinklerSimilarity } from "./sources/jaro-winkler-similarity.ts?fn";
import { generateJaroWinklerSimilaritySteps } from "./step-generator";
import type { JaroWinklerSimilarityInput } from "./step-generator";
import { jaroWinklerSimilarityEducational } from "./educational";

import typescriptSource from "./sources/jaro-winkler-similarity.ts?raw";
import pythonSource from "./sources/jaro-winkler-similarity.py?raw";
import javaSource from "./sources/JaroWinklerSimilarity.java?raw";

function executeJaroWinklerSimilarity(input: JaroWinklerSimilarityInput): number {
  return jaroWinklerSimilarity(input.source, input.target) as number;
}

const jaroWinklerSimilarityDefinition: AlgorithmDefinition<JaroWinklerSimilarityInput> = {
  meta: {
    id: ALGORITHM_ID.JARO_WINKLER_SIMILARITY!,
    name: "Jaro-Winkler Similarity",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Measure string similarity using Jaro's matching-character formula, boosted by a prefix bonus for strings sharing a common leading substring",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { source: "martha", target: "marhta" },
  },
  execute: executeJaroWinklerSimilarity,
  generateSteps: generateJaroWinklerSimilaritySteps,
  educational: jaroWinklerSimilarityEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(jaroWinklerSimilarityDefinition);
