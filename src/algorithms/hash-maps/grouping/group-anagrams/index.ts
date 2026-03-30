import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { groupAnagrams } from "./sources/group-anagrams.ts?fn";
import { generateGroupAnagramsSteps } from "./step-generator";
import type { GroupAnagramsInput } from "./step-generator";
import { groupAnagramsEducational } from "./educational";

import typescriptSource from "./sources/group-anagrams.ts?raw";
import pythonSource from "./sources/group-anagrams.py?raw";
import javaSource from "./sources/GroupAnagrams.java?raw";

function executeGroupAnagrams(input: GroupAnagramsInput): string[][] {
  return groupAnagrams(input.words) as string[][];
}

const groupAnagramsDefinition: AlgorithmDefinition<GroupAnagramsInput> = {
  meta: {
    id: ALGORITHM_ID.GROUP_ANAGRAMS!,
    name: "Group Anagrams",
    category: CATEGORY.HASH_MAPS!,
    technique: "grouping",
    description:
      "Group words that are anagrams of each other by sorting each word's characters to form a canonical hash map key",
    timeComplexity: {
      best: "O(n·k log k)",
      average: "O(n·k log k)",
      worst: "O(n·k log k)",
    },
    spaceComplexity: "O(n·k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { words: ["eat", "tea", "tan", "ate", "nat", "bat"] },
  },
  execute: executeGroupAnagrams,
  generateSteps: generateGroupAnagramsSteps,
  educational: groupAnagramsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(groupAnagramsDefinition);
