/** Registry entry for Auto-Complete with Trie — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { autoCompleteTrie } from "./sources/auto-complete-trie.ts?fn";
import { generateAutoCompleteTrieSteps } from "./step-generator";
import type { AutoCompleteTrieInput } from "./step-generator";
import { autoCompleteTrieEducational } from "./educational";

import typescriptSource from "./sources/auto-complete-trie.ts?raw";
import pythonSource from "./sources/auto-complete-trie.py?raw";
import javaSource from "./sources/AutoCompleteTrie.java?raw";
import rustSource from "./sources/auto-complete-trie.rs?raw";
import cppSource from "./sources/AutoCompleteTrie.cpp?raw";
import goSource from "./sources/auto-complete-trie.go?raw";

function executeAutoCompleteTrie(input: AutoCompleteTrieInput): string[] {
  return autoCompleteTrie(input.words, input.prefix) as string[];
}

const autoCompleteTrieDefinition: AlgorithmDefinition<AutoCompleteTrieInput> = {
  meta: {
    id: ALGORITHM_ID.AUTO_COMPLETE_TRIE!,
    name: "Auto-Complete with Trie",
    category: CATEGORY.STRINGS!,
    technique: "trie-operations",
    description:
      "Build a trie from a word list and return all words that start with a given prefix using DFS traversal from the prefix end node",
    timeComplexity: {
      best: "O(m)",
      average: "O(m + k)",
      worst: "O(m + k)",
    },
    spaceComplexity: "O(n × m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { words: ["apple", "app", "apricot", "banana", "bat"], prefix: "ap" },
  },
  execute: executeAutoCompleteTrie,
  generateSteps: generateAutoCompleteTrieSteps,
  educational: autoCompleteTrieEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(autoCompleteTrieDefinition);
