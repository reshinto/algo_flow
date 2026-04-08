import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findAllAnagrams } from "./sources/find-all-anagrams.ts?fn";
import { generateFindAllAnagramsSteps } from "./step-generator";
import type { FindAllAnagramsInput } from "./step-generator";
import { findAllAnagramsEducational } from "./educational";

import typescriptSource from "./sources/find-all-anagrams.ts?raw";
import pythonSource from "./sources/find-all-anagrams.py?raw";
import javaSource from "./sources/FindAllAnagrams.java?raw";
import rustSource from "./sources/find-all-anagrams.rs?raw";
import cppSource from "./sources/FindAllAnagrams.cpp?raw";
import goSource from "./sources/find-all-anagrams.go?raw";

function executeFindAllAnagrams(input: FindAllAnagramsInput): number[] {
  return findAllAnagrams(input.text, input.pattern) as number[];
}

const findAllAnagramsDefinition: AlgorithmDefinition<FindAllAnagramsInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_ALL_ANAGRAMS!,
    name: "Find All Anagrams",
    category: CATEGORY.HASH_MAPS!,
    technique: "frequency",
    description:
      "Find all start indices where a window of text is an anagram of the pattern in O(n) time using a sliding-window frequency map",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "cbaebabacd", pattern: "abc" },
  },
  execute: executeFindAllAnagrams,
  generateSteps: generateFindAllAnagramsSteps,
  educational: findAllAnagramsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(findAllAnagramsDefinition);
