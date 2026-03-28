/**
 * Largest Rectangle in Histogram algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { largestRectangleHistogram } from "./sources/largest-rectangle-histogram.ts?fn";
import { generateLargestRectangleHistogramSteps } from "./step-generator";
import { largestRectangleHistogramEducational } from "./educational";

import typescriptSource from "./sources/largest-rectangle-histogram.ts?raw";
import pythonSource from "./sources/largest-rectangle-histogram.py?raw";
import javaSource from "./sources/LargestRectangleHistogram.java?raw";

interface LargestRectangleHistogramInput {
  heights: number[];
}

const largestRectangleHistogramDefinition: AlgorithmDefinition<LargestRectangleHistogramInput> = {
  meta: {
    id: ALGORITHM_ID.LARGEST_RECTANGLE_HISTOGRAM!,
    name: "Largest Rectangle in Histogram",
    category: CATEGORY.ARRAYS!,
    description:
      "Finds the largest rectangular area in a histogram using a monotonic stack that tracks bar indices in increasing height order",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      heights: [2, 1, 5, 6, 2, 3],
    },
  },
  execute: (input: LargestRectangleHistogramInput) => largestRectangleHistogram(input.heights),
  generateSteps: generateLargestRectangleHistogramSteps,
  educational: largestRectangleHistogramEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(largestRectangleHistogramDefinition);
