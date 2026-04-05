/** Registry entry for Aho-Corasick Search — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { ahoCorasickSearch } from "./sources/aho-corasick-search.ts?fn";
import { generateAhoCorasickSearchSteps } from "./step-generator";
import type { AhoCorasickSearchInput } from "./step-generator";
import { ahoCorasickSearchEducational } from "./educational";

import typescriptSource from "./sources/aho-corasick-search.ts?raw";
import pythonSource from "./sources/aho-corasick-search.py?raw";
import javaSource from "./sources/AhoCorasickSearch.java?raw";

function executeAhoCorasickSearch(input: AhoCorasickSearchInput): string[] {
  return ahoCorasickSearch(input.text, input.patterns) as string[];
}

const ahoCorasickSearchDefinition: AlgorithmDefinition<AhoCorasickSearchInput> = {
  meta: {
    id: ALGORITHM_ID.AHO_CORASICK_SEARCH!,
    name: "Aho-Corasick Search",
    category: CATEGORY.STRINGS!,
    technique: "trie-operations",
    description:
      "Build a trie from multiple patterns, add BFS-computed failure links, then scan text once to find all occurrences of all patterns in O(n + m + z) time",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m + z)",
      worst: "O(n + m + z)",
    },
    spaceComplexity: "O(m × k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "ahishers", patterns: ["he", "she", "his", "hers"] },
  },
  execute: executeAhoCorasickSearch,
  generateSteps: generateAhoCorasickSearchSteps,
  educational: ahoCorasickSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(ahoCorasickSearchDefinition);
