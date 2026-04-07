import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { removeAllAdjacentDuplicates } from "./sources/remove-all-adjacent-duplicates.ts?fn";
import { generateRemoveAllAdjacentDuplicatesSteps } from "./step-generator";
import type { RemoveAllAdjacentDuplicatesInput } from "./step-generator";
import { removeAllAdjacentDuplicatesEducational } from "./educational";

import typescriptSource from "./sources/remove-all-adjacent-duplicates.ts?raw";
import pythonSource from "./sources/remove-all-adjacent-duplicates.py?raw";
import javaSource from "./sources/RemoveAllAdjacentDuplicates.java?raw";
import rustSource from "./sources/remove-all-adjacent-duplicates.rs?raw";
import cppSource from "./sources/RemoveAllAdjacentDuplicates.cpp?raw";
import goSource from "./sources/remove-all-adjacent-duplicates.go?raw";

function executeRemoveAllAdjacentDuplicates(input: RemoveAllAdjacentDuplicatesInput): string {
  return removeAllAdjacentDuplicates(input.inputString) as string;
}

const removeAllAdjacentDuplicatesDefinition: AlgorithmDefinition<RemoveAllAdjacentDuplicatesInput> =
  {
    meta: {
      id: ALGORITHM_ID.REMOVE_ALL_ADJACENT_DUPLICATES!,
      name: "Remove All Adjacent Duplicates",
      category: CATEGORY.STACKS_QUEUES!,
      technique: "stack-applications",
      description:
        "Use a stack to cancel adjacent duplicate character pairs in a single pass, producing the fully deduplicated string",
      timeComplexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
      },
      spaceComplexity: "O(n)",
      supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
      defaultInput: { inputString: "abbaca" },
    },
    execute: executeRemoveAllAdjacentDuplicates,
    generateSteps: generateRemoveAllAdjacentDuplicatesSteps,
    educational: removeAllAdjacentDuplicatesEducational,
    sources: {
      typescript: typescriptSource,
      python: pythonSource,
      java: javaSource,
      rust: rustSource,
      cpp: cppSource,
      go: goSource,
    },
  };

registry.register(removeAllAdjacentDuplicatesDefinition);
