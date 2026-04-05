/** Registry entry for Trie Insert and Search — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { trieInsertSearch } from "./sources/trie-insert-search.ts?fn";
import { generateTrieInsertSearchSteps } from "./step-generator";
import type { TrieInsertSearchInput } from "./step-generator";
import { trieInsertSearchEducational } from "./educational";

import typescriptSource from "./sources/trie-insert-search.ts?raw";
import pythonSource from "./sources/trie-insert-search.py?raw";
import javaSource from "./sources/TrieInsertSearch.java?raw";

function executeTrieInsertSearch(input: TrieInsertSearchInput): boolean {
  return trieInsertSearch(input.words, input.search) as boolean;
}

const trieInsertSearchDefinition: AlgorithmDefinition<TrieInsertSearchInput> = {
  meta: {
    id: ALGORITHM_ID.TRIE_INSERT_SEARCH!,
    name: "Trie Insert & Search",
    category: CATEGORY.STRINGS!,
    technique: "trie-operations",
    description:
      "Build a trie from a list of words and search for an exact word in O(m) time per operation, where m is the word length",
    timeComplexity: {
      best: "O(m)",
      average: "O(m)",
      worst: "O(m)",
    },
    spaceComplexity: "O(n × m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { words: ["apple", "app", "apricot"], search: "app" },
  },
  execute: executeTrieInsertSearch,
  generateSteps: generateTrieInsertSearchSteps,
  educational: trieInsertSearchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(trieInsertSearchDefinition);
