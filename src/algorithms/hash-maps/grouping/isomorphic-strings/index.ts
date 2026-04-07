import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateIsomorphicStringsSteps } from "./step-generator";
import type { IsomorphicStringsInput } from "./step-generator";
import { isomorphicStringsEducational } from "./educational";

import typescriptSource from "./sources/isomorphic-strings.ts?raw";
import pythonSource from "./sources/isomorphic-strings.py?raw";
import javaSource from "./sources/IsomorphicStrings.java?raw";
import rustSource from "./sources/isomorphic-strings.rs?raw";
import cppSource from "./sources/IsomorphicStrings.cpp?raw";
import goSource from "./sources/isomorphic-strings.go?raw";

function executeIsomorphicStrings(input: IsomorphicStringsInput): boolean {
  const { textA, textB } = input;
  if (textA.length !== textB.length) return false;
  const aToB = new Map<string, string>();
  const bToA = new Map<string, string>();
  for (let charIndex = 0; charIndex < textA.length; charIndex++) {
    const charA = textA[charIndex]!;
    const charB = textB[charIndex]!;
    const mappedB = aToB.get(charA);
    const mappedA = bToA.get(charB);
    if (mappedB === undefined && mappedA === undefined) {
      aToB.set(charA, charB);
      bToA.set(charB, charA);
    } else if (mappedB !== charB || mappedA !== charA) {
      return false;
    }
  }
  return true;
}

const definition: AlgorithmDefinition<IsomorphicStringsInput> = {
  meta: {
    id: ALGORITHM_ID.ISOMORPHIC_STRINGS!,
    name: "Isomorphic Strings",
    category: CATEGORY.HASH_MAPS!,
    technique: "grouping",
    description: "Check if two strings are isomorphic using bidirectional character mapping",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { textA: "egg", textB: "add" },
  },
  execute: executeIsomorphicStrings,
  generateSteps: generateIsomorphicStringsSteps,
  educational: isomorphicStringsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(definition);
