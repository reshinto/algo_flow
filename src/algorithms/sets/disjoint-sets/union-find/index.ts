import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { unionFind } from "./sources/union-find.ts?fn";
import { generateUnionFindSteps } from "./step-generator";
import type { UnionFindInput } from "./step-generator";
import { unionFindEducational } from "./educational";

import typescriptSource from "./sources/union-find.ts?raw";
import pythonSource from "./sources/union-find.py?raw";
import javaSource from "./sources/UnionFind.java?raw";
import rustSource from "./sources/union-find.rs?raw";
import cppSource from "./sources/UnionFind.cpp?raw";
import goSource from "./sources/union-find.go?raw";

function executeUnionFind(input: UnionFindInput): { components: number[][] } {
  return unionFind(input.elementCount, input.operations) as { components: number[][] };
}

const unionFindDefinition: AlgorithmDefinition<UnionFindInput> = {
  meta: {
    id: ALGORITHM_ID.UNION_FIND!,
    name: "Union-Find",
    category: CATEGORY.SETS!,
    technique: "disjoint-sets",
    description:
      "Maintains a partition of elements into disjoint sets with near-constant-time find and union operations. " +
      "Path compression flattens trees during find; union by rank keeps trees shallow. " +
      "O(α(n)) amortized per operation, O(n) space.",
    timeComplexity: {
      best: "O(α(n))",
      average: "O(α(n))",
      worst: "O(α(n))",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      elementCount: 8,
      operations: [
        [0, 1],
        [2, 3],
        [4, 5],
        [6, 7],
        [0, 2],
        [4, 6],
        [0, 4],
      ],
    },
  },
  execute: executeUnionFind,
  generateSteps: generateUnionFindSteps,
  educational: unionFindEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(unionFindDefinition);
