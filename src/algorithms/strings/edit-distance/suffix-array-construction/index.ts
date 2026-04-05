/** Registry entry for Suffix Array Construction — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { suffixArrayConstruction } from "./sources/suffix-array-construction.ts?fn";
import { generateSuffixArrayConstructionSteps } from "./step-generator";
import type { SuffixArrayConstructionInput } from "./step-generator";
import { suffixArrayConstructionEducational } from "./educational";

import typescriptSource from "./sources/suffix-array-construction.ts?raw";
import pythonSource from "./sources/suffix-array-construction.py?raw";
import javaSource from "./sources/SuffixArrayConstruction.java?raw";

function executeSuffixArrayConstruction(input: SuffixArrayConstructionInput): number[] {
  return suffixArrayConstruction(input.text) as number[];
}

const suffixArrayConstructionDefinition: AlgorithmDefinition<SuffixArrayConstructionInput> = {
  meta: {
    id: ALGORITHM_ID.SUFFIX_ARRAY_CONSTRUCTION!,
    name: "Suffix Array Construction",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Build a sorted array of all suffixes of a string represented as starting indices, using lexicographic comparison to order them",
    timeComplexity: {
      best: "O(n log²n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "banana" },
  },
  execute: executeSuffixArrayConstruction,
  generateSteps: generateSuffixArrayConstructionSteps,
  educational: suffixArrayConstructionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(suffixArrayConstructionDefinition);
