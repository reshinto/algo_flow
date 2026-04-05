/** Registry entry for Minimum Window Substring — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minimumWindowSubstring } from "./sources/minimum-window-substring.ts?fn";
import { generateMinimumWindowSubstringSteps } from "./step-generator";
import type { MinimumWindowSubstringInput } from "./step-generator";
import { minimumWindowSubstringEducational } from "./educational";

import typescriptSource from "./sources/minimum-window-substring.ts?raw";
import pythonSource from "./sources/minimum-window-substring.py?raw";
import javaSource from "./sources/MinimumWindowSubstring.java?raw";

function executeMinimumWindowSubstring(input: MinimumWindowSubstringInput): string {
  return minimumWindowSubstring(input.text, input.pattern) as string;
}

const minimumWindowSubstringDefinition: AlgorithmDefinition<MinimumWindowSubstringInput> = {
  meta: {
    id: ALGORITHM_ID.MINIMUM_WINDOW_SUBSTRING!,
    name: "Minimum Window Substring",
    category: CATEGORY.STRINGS!,
    technique: "character-frequency",
    description:
      "Find the smallest contiguous window in text containing all characters of pattern using a sliding window with two frequency maps in O(n+m) time",
    timeComplexity: {
      best: "O(n+m)",
      average: "O(n+m)",
      worst: "O(n+m)",
    },
    spaceComplexity: "O(σ)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "ADOBECODEBANC", pattern: "ABC" },
  },
  execute: executeMinimumWindowSubstring,
  generateSteps: generateMinimumWindowSubstringSteps,
  educational: minimumWindowSubstringEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(minimumWindowSubstringDefinition);
