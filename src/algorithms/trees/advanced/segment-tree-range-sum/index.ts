import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { segmentTreeRangeSum } from "./sources/segment-tree-range-sum.ts?fn";
import { generateSegmentTreeRangeSumSteps } from "./step-generator";
import type { SegmentTreeRangeSumInput } from "./step-generator";
import { segmentTreeRangeSumEducational } from "./educational";

import typescriptSource from "./sources/segment-tree-range-sum.ts?raw";
import pythonSource from "./sources/segment-tree-range-sum.py?raw";
import javaSource from "./sources/SegmentTreeRangeSum.java?raw";

function executeSegmentTreeRangeSum(input: SegmentTreeRangeSumInput): number[] {
  return segmentTreeRangeSum(input.array, input.queries) as number[];
}

const segmentTreeRangeSumDefinition: AlgorithmDefinition<SegmentTreeRangeSumInput> = {
  meta: {
    id: ALGORITHM_ID.SEGMENT_TREE_RANGE_SUM!,
    name: "Segment Tree Range Sum",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Build a segment tree from an array and answer range sum queries in O(log n) per query",
    timeComplexity: { best: "O(n + q log n)", average: "O(n + q log n)", worst: "O(n + q log n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      array: [1, 3, 5, 7, 9, 11],
      queries: [
        [1, 3],
        [0, 5],
      ],
    },
  },
  execute: executeSegmentTreeRangeSum,
  generateSteps: generateSegmentTreeRangeSumSteps,
  educational: segmentTreeRangeSumEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(segmentTreeRangeSumDefinition);
