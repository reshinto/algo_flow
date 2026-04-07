/** Registry definition for String Compression — self-registers on import. */

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { stringCompression } from "./sources/string-compression.ts?fn";
import { generateStringCompressionSteps } from "./step-generator";
import type { StringCompressionInput } from "./step-generator";
import { stringCompressionEducational } from "./educational";

import typescriptSource from "./sources/string-compression.ts?raw";
import pythonSource from "./sources/string-compression.py?raw";
import javaSource from "./sources/StringCompression.java?raw";
import rustSource from "./sources/string-compression.rs?raw";
import cppSource from "./sources/StringCompression.cpp?raw";
import goSource from "./sources/string-compression.go?raw";

function executeStringCompression(input: StringCompressionInput): string {
  return stringCompression(input.text) as string;
}

const stringCompressionDefinition: AlgorithmDefinition<StringCompressionInput> = {
  meta: {
    id: ALGORITHM_ID.STRING_COMPRESSION!,
    name: "String Compression",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Compress consecutive repeated characters using run-length encoding — " +
      '"aabcccccaaa" → "a2b1c5a3"; returns original if compressed form is not shorter. O(n) time',
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { text: "aabcccccaaa" },
  },
  execute: executeStringCompression,
  generateSteps: generateStringCompressionSteps,
  educational: stringCompressionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(stringCompressionDefinition);
