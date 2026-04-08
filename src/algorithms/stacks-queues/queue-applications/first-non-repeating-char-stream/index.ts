import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { firstNonRepeatingCharStream } from "./sources/first-non-repeating-char-stream.ts?fn";
import { generateFirstNonRepeatingCharStreamSteps } from "./step-generator";
import type { FirstNonRepeatingCharStreamInput } from "./step-generator";
import { firstNonRepeatingCharStreamEducational } from "./educational";

import typescriptSource from "./sources/first-non-repeating-char-stream.ts?raw";
import pythonSource from "./sources/first-non-repeating-char-stream.py?raw";
import javaSource from "./sources/FirstNonRepeatingCharStream.java?raw";
import rustSource from "./sources/first-non-repeating-char-stream.rs?raw";
import cppSource from "./sources/FirstNonRepeatingCharStream.cpp?raw";
import goSource from "./sources/first-non-repeating-char-stream.go?raw";

function executeFirstNonRepeatingCharStream(input: FirstNonRepeatingCharStreamInput): string[] {
  return firstNonRepeatingCharStream(input.inputString) as string[];
}

const firstNonRepeatingCharStreamDefinition: AlgorithmDefinition<FirstNonRepeatingCharStreamInput> =
  {
    meta: {
      id: ALGORITHM_ID.FIRST_NON_REPEATING_CHAR_STREAM!,
      name: "First Non-Repeating Char Stream",
      category: CATEGORY.STACKS_QUEUES!,
      technique: "queue-applications",
      description:
        "Find the first non-repeating character in a stream after each new character arrives — uses a queue as a candidate buffer and a frequency map to prune repeated characters from the front",
      timeComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
      },
      spaceComplexity: "O(k)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: { inputString: "aabcbcd" },
    },
    execute: executeFirstNonRepeatingCharStream,
    generateSteps: generateFirstNonRepeatingCharStreamSteps,
    educational: firstNonRepeatingCharStreamEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(firstNonRepeatingCharStreamDefinition);
