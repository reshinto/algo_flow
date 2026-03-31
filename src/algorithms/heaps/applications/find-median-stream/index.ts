import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findMedianStream } from "./sources/find-median-stream.ts?fn";
import { generateFindMedianStreamSteps } from "./step-generator";
import type { FindMedianStreamInput } from "./step-generator";
import { findMedianStreamEducational } from "./educational";

import typescriptSource from "./sources/find-median-stream.ts?raw";
import pythonSource from "./sources/find-median-stream.py?raw";
import javaSource from "./sources/FindMedianStream.java?raw";

function executeFindMedianStream(input: FindMedianStreamInput): number[] {
  return findMedianStream(input.stream) as number[];
}

const findMedianStreamDefinition: AlgorithmDefinition<FindMedianStreamInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_MEDIAN_STREAM!,
    name: "Find Median from Stream",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Compute the running median from a data stream using two heaps: a max-heap for the lower half and a min-heap for the upper half, yielding O(log n) insertion and O(1) median access",
    timeComplexity: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { stream: [5, 2, 8, 1, 9, 3, 7] },
  },
  execute: executeFindMedianStream,
  generateSteps: generateFindMedianStreamSteps,
  educational: findMedianStreamEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(findMedianStreamDefinition);
