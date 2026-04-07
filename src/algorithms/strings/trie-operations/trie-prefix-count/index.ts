/** Registry entry for Trie Prefix Count — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { triePrefixCount } from "./sources/trie-prefix-count.ts?fn";
import { generateTriePrefixCountSteps } from "./step-generator";
import type { TriePrefixCountInput } from "./step-generator";
import { triePrefixCountEducational } from "./educational";

import typescriptSource from "./sources/trie-prefix-count.ts?raw";
import pythonSource from "./sources/trie-prefix-count.py?raw";
import javaSource from "./sources/TriePrefixCount.java?raw";
import rustSource from "./sources/trie-prefix-count.rs?raw";
import cppSource from "./sources/TriePrefixCount.cpp?raw";
import goSource from "./sources/trie-prefix-count.go?raw";

function executeTriePrefixCount(input: TriePrefixCountInput): number {
  return triePrefixCount(input.words, input.prefix) as number;
}

const triePrefixCountDefinition: AlgorithmDefinition<TriePrefixCountInput> = {
  meta: {
    id: ALGORITHM_ID.TRIE_PREFIX_COUNT!,
    name: "Trie Prefix Count",
    category: CATEGORY.STRINGS!,
    technique: "trie-operations",
    description:
      "Build a trie from a list of words and count how many words start with a given prefix in O(m) time, where m is the prefix length",
    timeComplexity: {
      best: "O(m)",
      average: "O(m)",
      worst: "O(m)",
    },
    spaceComplexity: "O(n × m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { words: ["apple", "app", "apricot", "ape"], prefix: "ap" },
  },
  execute: executeTriePrefixCount,
  generateSteps: generateTriePrefixCountSteps,
  educational: triePrefixCountEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(triePrefixCountDefinition);
