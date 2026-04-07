/** Registry definition for Reverse Words in a String — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { reverseWords } from "./sources/reverse-words.ts?fn";
import { generateReverseWordsSteps } from "./step-generator";
import type { ReverseWordsInput } from "./step-generator";
import { reverseWordsEducational } from "./educational";

import typescriptSource from "./sources/reverse-words.ts?raw";
import pythonSource from "./sources/reverse-words.py?raw";
import javaSource from "./sources/ReverseWords.java?raw";
import rustSource from "./sources/reverse-words.rs?raw";
import cppSource from "./sources/ReverseWords.cpp?raw";
import goSource from "./sources/reverse-words.go?raw";

function executeReverseWords(input: ReverseWordsInput): string {
  return reverseWords(input.text) as string;
}

const reverseWordsDefinition: AlgorithmDefinition<ReverseWordsInput> = {
  meta: {
    id: ALGORITHM_ID.REVERSE_WORDS!,
    name: "Reverse Words in a String",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Reverse the order of words in a string by splitting on whitespace, applying a two-pointer swap, " +
      "and rejoining — trims extra spaces in O(n) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "the sky is blue" },
  },
  execute: executeReverseWords,
  generateSteps: generateReverseWordsSteps,
  educational: reverseWordsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(reverseWordsDefinition);
