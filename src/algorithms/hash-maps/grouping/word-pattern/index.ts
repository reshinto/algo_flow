import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { wordPattern } from "./sources/word-pattern.ts?fn";
import { generateWordPatternSteps } from "./step-generator";
import type { WordPatternInput } from "./step-generator";
import { wordPatternEducational } from "./educational";

import typescriptSource from "./sources/word-pattern.ts?raw";
import pythonSource from "./sources/word-pattern.py?raw";
import javaSource from "./sources/WordPattern.java?raw";
import rustSource from "./sources/word-pattern.rs?raw";
import cppSource from "./sources/WordPattern.cpp?raw";
import goSource from "./sources/word-pattern.go?raw";

function executeWordPattern(input: WordPatternInput): boolean {
  return wordPattern(input.pattern, input.sentence) as boolean;
}

const wordPatternDefinition: AlgorithmDefinition<WordPatternInput> = {
  meta: {
    id: ALGORITHM_ID.WORD_PATTERN!,
    name: "Word Pattern",
    category: CATEGORY.HASH_MAPS!,
    technique: "grouping",
    description:
      "Verify that a sentence follows a character pattern exactly using two bidirectional hash maps to enforce a one-to-one bijection",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { pattern: "abba", sentence: "dog cat cat dog" },
  },
  execute: executeWordPattern,
  generateSteps: generateWordPatternSteps,
  educational: wordPatternEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(wordPatternDefinition);
