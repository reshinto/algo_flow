import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateRansomNoteSteps } from "./step-generator";
import type { RansomNoteInput } from "./step-generator";
import { ransomNoteEducational } from "./educational";

import typescriptSource from "./sources/ransom-note.ts?raw";
import pythonSource from "./sources/ransom-note.py?raw";
import javaSource from "./sources/RansomNote.java?raw";

function executeRansomNote(input: RansomNoteInput): boolean {
  const { ransomNote: ransomNoteText, magazine } = input;
  const charCounts = new Map<string, number>();
  for (const currentChar of magazine) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1);
  }
  for (const currentChar of ransomNoteText) {
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1;
    if (updatedCount < 0) return false;
    charCounts.set(currentChar, updatedCount);
  }
  return true;
}

const definition: AlgorithmDefinition<RansomNoteInput> = {
  meta: {
    id: ALGORITHM_ID.RANSOM_NOTE!,
    name: "Ransom Note",
    category: CATEGORY.HASH_MAPS!,
    technique: "counting",
    description:
      "Check if a ransom note can be constructed from magazine characters using a frequency count map",
    timeComplexity: { best: "O(m)", average: "O(m + n)", worst: "O(m + n)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { ransomNote: "aa", magazine: "aab" },
  },
  execute: executeRansomNote,
  generateSteps: generateRansomNoteSteps,
  educational: ransomNoteEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
