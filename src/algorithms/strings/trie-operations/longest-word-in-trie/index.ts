/** Registry entry for Longest Word in Trie — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestWordInTrie } from "./sources/longest-word-in-trie.ts?fn";
import { generateLongestWordInTrieSteps } from "./step-generator";
import type { LongestWordInTrieInput } from "./step-generator";
import { longestWordInTrieEducational } from "./educational";

import typescriptSource from "./sources/longest-word-in-trie.ts?raw";
import pythonSource from "./sources/longest-word-in-trie.py?raw";
import javaSource from "./sources/LongestWordInTrie.java?raw";

function executeLongestWordInTrie(input: LongestWordInTrieInput): string {
  return longestWordInTrie(input.words) as string;
}

const longestWordInTrieDefinition: AlgorithmDefinition<LongestWordInTrieInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_WORD_IN_TRIE!,
    name: "Longest Word in Trie",
    category: CATEGORY.STRINGS!,
    technique: "trie-operations",
    description:
      "Build a trie from a list of words and find the longest word where every prefix is also present in the set, using DFS traversal that only follows end-of-word nodes",
    timeComplexity: {
      best: "O(n×m)",
      average: "O(n×m)",
      worst: "O(n×m)",
    },
    spaceComplexity: "O(n × m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { words: ["w", "wo", "wor", "worl", "world"] },
  },
  execute: executeLongestWordInTrie,
  generateSteps: generateLongestWordInTrieSteps,
  educational: longestWordInTrieEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestWordInTrieDefinition);
