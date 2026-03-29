/**
 * Boyer-Moore Voting Algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { boyerMooreVoting } from "./sources/boyer-moore-voting.ts?fn";
import { generateBoyerMooreVotingSteps } from "./step-generator";
import { boyerMooreVotingEducational } from "./educational";

import typescriptSource from "./sources/boyer-moore-voting.ts?raw";
import pythonSource from "./sources/boyer-moore-voting.py?raw";
import javaSource from "./sources/BoyerMooreVoting.java?raw";

interface BoyerMooreVotingInput {
  inputArray: number[];
}

const boyerMooreVotingDefinition: AlgorithmDefinition<BoyerMooreVotingInput> = {
  meta: {
    id: ALGORITHM_ID.BOYER_MOORE_VOTING!,
    name: "Boyer-Moore Voting (Majority)",
    category: CATEGORY.ARRAYS!,
    technique: "voting",
    description:
      "An O(n) time, O(1) space algorithm for finding the majority element using a candidate cancellation strategy",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    },
  },
  execute: (input: BoyerMooreVotingInput) => boyerMooreVoting(input.inputArray),
  generateSteps: generateBoyerMooreVotingSteps,
  educational: boyerMooreVotingEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(boyerMooreVotingDefinition);
