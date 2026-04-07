import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { segmentTreeRangeMin } from "./sources/segment-tree-range-min.ts?fn";
import { generateSegmentTreeRangeMinSteps } from "./step-generator";
import type { SegmentTreeRangeMinInput } from "./step-generator";
import { segmentTreeRangeMinEducational } from "./educational";

import typescriptSource from "./sources/segment-tree-range-min.ts?raw";
import pythonSource from "./sources/segment-tree-range-min.py?raw";
import javaSource from "./sources/SegmentTreeRangeMin.java?raw";
import rustSource from "./sources/segment-tree-range-min.rs?raw";
import cppSource from "./sources/SegmentTreeRangeMin.cpp?raw";
import goSource from "./sources/segment-tree-range-min.go?raw";

function executeSegmentTreeRangeMin(input: SegmentTreeRangeMinInput): number[] {
  return segmentTreeRangeMin(input.array, input.queries) as number[];
}

const segmentTreeRangeMinDefinition: AlgorithmDefinition<SegmentTreeRangeMinInput> = {
  meta: {
    id: ALGORITHM_ID.SEGMENT_TREE_RANGE_MIN!,
    name: "Segment Tree Range Min",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Build a segment tree for range minimum queries — find the minimum element in any subrange in O(log n)",
    timeComplexity: { best: "O(n + q log n)", average: "O(n + q log n)", worst: "O(n + q log n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      array: [2, 5, 1, 4, 9, 3],
      queries: [
        [0, 2],
        [3, 5],
      ],
    },
  },
  execute: executeSegmentTreeRangeMin,
  generateSteps: generateSegmentTreeRangeMinSteps,
  educational: segmentTreeRangeMinEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(segmentTreeRangeMinDefinition);
