import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { jewelsAndStones } from "./sources/jewels-and-stones.ts?fn";
import { generateJewelsAndStonesSteps, type JewelsAndStonesInput } from "./step-generator";
import { jewelsAndStonesEducational } from "./educational";

import typescriptSource from "./sources/jewels-and-stones.ts?raw";
import pythonSource from "./sources/jewels-and-stones.py?raw";
import javaSource from "./sources/JewelsAndStones.java?raw";
import rustSource from "./sources/jewels-and-stones.rs?raw";
import cppSource from "./sources/JewelsAndStones.cpp?raw";
import goSource from "./sources/jewels-and-stones.go?raw";

function executeJewelsAndStones(input: JewelsAndStonesInput): number {
  return jewelsAndStones(input.jewels, input.stones);
}

const jewelsAndStonesDefinition: AlgorithmDefinition<JewelsAndStonesInput> = {
  meta: {
    id: ALGORITHM_ID.JEWELS_AND_STONES!,
    name: "Jewels and Stones",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description:
      "Count how many stones are jewels by building a hash set from the jewels string for O(1) membership checks",
    timeComplexity: {
      best: "O(|jewels| + |stones|)",
      average: "O(|jewels| + |stones|)",
      worst: "O(|jewels| + |stones|)",
    },
    spaceComplexity: "O(|jewels|)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { jewels: "aA", stones: "aAAbbbb" },
  },
  execute: executeJewelsAndStones,
  generateSteps: generateJewelsAndStonesSteps,
  educational: jewelsAndStonesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(jewelsAndStonesDefinition);
