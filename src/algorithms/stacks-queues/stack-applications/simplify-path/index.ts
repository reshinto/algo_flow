import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { simplifyPath } from "./sources/simplify-path.ts?fn";
import { generateSimplifyPathSteps } from "./step-generator";
import type { SimplifyPathInput } from "./step-generator";
import { simplifyPathEducational } from "./educational";

import typescriptSource from "./sources/simplify-path.ts?raw";
import pythonSource from "./sources/simplify-path.py?raw";
import javaSource from "./sources/SimplifyPath.java?raw";
import rustSource from "./sources/simplify-path.rs?raw";
import cppSource from "./sources/SimplifyPath.cpp?raw";
import goSource from "./sources/simplify-path.go?raw";

function executeSimplifyPath(input: SimplifyPathInput): string {
  return simplifyPath(input.inputString) as string;
}

const simplifyPathDefinition: AlgorithmDefinition<SimplifyPathInput> = {
  meta: {
    id: ALGORITHM_ID.SIMPLIFY_PATH!,
    name: "Simplify Path",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-applications",
    description:
      "Use a stack to resolve Unix path components — skipping `.` and empty segments, popping on `..` — into a canonical absolute path",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { inputString: "/a/./b/../../c/" },
  },
  execute: executeSimplifyPath,
  generateSteps: generateSimplifyPathSteps,
  educational: simplifyPathEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(simplifyPathDefinition);
