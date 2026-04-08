/** Registry entry for Regular Expression Matching — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { regexMatching } from "./sources/regex-matching.ts?fn";
import { generateRegexMatchingSteps } from "./step-generator";
import type { RegexMatchingInput } from "./step-generator";
import { regexMatchingEducational } from "./educational";

import typescriptSource from "./sources/regex-matching.ts?raw";
import pythonSource from "./sources/regex-matching.py?raw";
import javaSource from "./sources/RegexMatching.java?raw";
import rustSource from "./sources/regex-matching.rs?raw";
import cppSource from "./sources/RegexMatching.cpp?raw";
import goSource from "./sources/regex-matching.go?raw";

function executeRegexMatching(input: RegexMatchingInput): boolean {
  return regexMatching(input.text, input.pattern) as boolean;
}

const regexMatchingDefinition: AlgorithmDefinition<RegexMatchingInput> = {
  meta: {
    id: ALGORITHM_ID.REGEX_MATCHING!,
    name: "Regular Expression Matching",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Determine if a text string fully matches a pattern containing '.' (any single character) and '*' (zero or more of the preceding element) using dynamic programming",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(nm)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "aab", pattern: "c*a*b" },
  },
  execute: executeRegexMatching,
  generateSteps: generateRegexMatchingSteps,
  educational: regexMatchingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(regexMatchingDefinition);
