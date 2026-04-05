// Registry entry for Run-Length Decoding — self-registers the algorithm definition on import.

import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { runLengthDecoding } from "./sources/run-length-decoding.ts?fn";
import { generateRunLengthDecodingSteps } from "./step-generator";
import type { RunLengthDecodingInput } from "./step-generator";
import { runLengthDecodingEducational } from "./educational";

import typescriptSource from "./sources/run-length-decoding.ts?raw";
import pythonSource from "./sources/run-length-decoding.py?raw";
import javaSource from "./sources/RunLengthDecoding.java?raw";

function executeRunLengthDecoding(input: RunLengthDecodingInput): string {
  return runLengthDecoding(input.text) as string;
}

const runLengthDecodingDefinition: AlgorithmDefinition<RunLengthDecodingInput> = {
  meta: {
    id: ALGORITHM_ID.RUN_LENGTH_DECODING!,
    name: "Run-Length Decoding",
    category: CATEGORY.STRINGS!,
    technique: "transformation",
    description:
      "Expand a run-length encoded string by parsing digit sequences as repeat counts and repeating the following character — O(output length) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "3a2b4c" },
  },
  execute: executeRunLengthDecoding,
  generateSteps: generateRunLengthDecodingSteps,
  educational: runLengthDecodingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(runLengthDecodingDefinition);
