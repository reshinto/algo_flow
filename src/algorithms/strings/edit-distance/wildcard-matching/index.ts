/** Registry entry for Wildcard Matching — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { wildcardMatching } from "./sources/wildcard-matching.ts?fn";
import { generateWildcardMatchingSteps } from "./step-generator";
import type { WildcardMatchingInput } from "./step-generator";
import { wildcardMatchingEducational } from "./educational";

import typescriptSource from "./sources/wildcard-matching.ts?raw";
import pythonSource from "./sources/wildcard-matching.py?raw";
import javaSource from "./sources/WildcardMatching.java?raw";
import rustSource from "./sources/wildcard-matching.rs?raw";
import cppSource from "./sources/WildcardMatching.cpp?raw";
import goSource from "./sources/wildcard-matching.go?raw";

function executeWildcardMatching(input: WildcardMatchingInput): boolean {
  return wildcardMatching(input.text, input.pattern) as boolean;
}

const wildcardMatchingDefinition: AlgorithmDefinition<WildcardMatchingInput> = {
  meta: {
    id: ALGORITHM_ID.WILDCARD_MATCHING!,
    name: "Wildcard Matching",
    category: CATEGORY.STRINGS!,
    technique: "edit-distance",
    description:
      "Determine if a text string matches a pattern that may contain '?' (any single character) and '*' (any sequence of characters, including empty) using dynamic programming",
    timeComplexity: {
      best: "O(nm)",
      average: "O(nm)",
      worst: "O(nm)",
    },
    spaceComplexity: "O(nm)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "adceb", pattern: "*a*b" },
  },
  execute: executeWildcardMatching,
  generateSteps: generateWildcardMatchingSteps,
  educational: wildcardMatchingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(wildcardMatchingDefinition);
