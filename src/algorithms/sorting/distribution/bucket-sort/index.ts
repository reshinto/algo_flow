/**
 * Bucket Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bucketSort } from "./sources/bucket-sort.ts?fn";
import { generateBucketSortSteps } from "./step-generator";
import { bucketSortEducational } from "./educational";

import typescriptSource from "./sources/bucket-sort.ts?raw";
import pythonSource from "./sources/bucket-sort.py?raw";
import javaSource from "./sources/BucketSort.java?raw";
import rustSource from "./sources/bucket-sort.rs?raw";
import cppSource from "./sources/BucketSort.cpp?raw";
import goSource from "./sources/bucket-sort.go?raw";

const bucketSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BUCKET_SORT!,
    name: "Bucket Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Distributes elements into range-based buckets, sorts each bucket, then concatenates them",
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n + k)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: bucketSort,
  generateSteps: generateBucketSortSteps,
  educational: bucketSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bucketSortDefinition);
