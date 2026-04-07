import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { movingAverageFromStream } from "./sources/moving-average-from-stream.ts?fn";
import { generateMovingAverageFromStreamSteps } from "./step-generator";
import type { MovingAverageFromStreamInput } from "./step-generator";
import { movingAverageFromStreamEducational } from "./educational";

import typescriptSource from "./sources/moving-average-from-stream.ts?raw";
import pythonSource from "./sources/moving-average-from-stream.py?raw";
import javaSource from "./sources/MovingAverageFromStream.java?raw";
import rustSource from "./sources/moving-average-from-stream.rs?raw";
import cppSource from "./sources/MovingAverageFromStream.cpp?raw";
import goSource from "./sources/moving-average-from-stream.go?raw";

function executeMovingAverageFromStream(input: MovingAverageFromStreamInput): number[] {
  return movingAverageFromStream(input.values, input.windowSize) as number[];
}

const movingAverageFromStreamDefinition: AlgorithmDefinition<MovingAverageFromStreamInput> = {
  meta: {
    id: ALGORITHM_ID.MOVING_AVERAGE_FROM_STREAM!,
    name: "Moving Average from Stream",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-design",
    description:
      "Maintain a running average over the last k values using a fixed-size queue and a running sum — O(1) per value with O(k) space",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [1, 10, 3, 5], windowSize: 3 },
  },
  execute: executeMovingAverageFromStream,
  generateSteps: generateMovingAverageFromStreamSteps,
  educational: movingAverageFromStreamEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(movingAverageFromStreamDefinition);
