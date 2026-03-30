/** Step generator for Group Anagrams — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const GROUP_ANAGRAMS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GROUP_ANAGRAMS!);

export interface GroupAnagramsInput {
  words: string[];
}

export function generateGroupAnagramsSteps(input: GroupAnagramsInput): ExecutionStep[] {
  const { words } = input;
  const tracker = new HashMapTracker(words, GROUP_ANAGRAMS_LINE_MAP);
  const map = new Map<string, string[]>();

  tracker.initialize({ words });

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex]!;
    const sortedKey = word.split("").sort().join("");

    tracker.processElement(wordIndex, { wordIndex, word, sortedKey });
    tracker.lookupKey(sortedKey, { sortedKey, word });

    if (map.has(sortedKey)) {
      const existingGroup = map.get(sortedKey)!;
      existingGroup.push(word);
      const groupSnapshot = map.get(sortedKey)!.join(", ");
      tracker.updateValue(sortedKey, groupSnapshot, {
        sortedKey,
        group: existingGroup,
        word,
      });
    } else {
      map.set(sortedKey, [word]);
      tracker.insertKey(sortedKey, word, { sortedKey, word });
    }
  }

  const groups: Record<string, string[]> = {};
  for (const [key, group] of map.entries()) {
    groups[key] = group;
  }
  const groupsArray = Array.from(map.values());

  tracker.setGroupResult(groups);
  tracker.setResult(groupsArray);
  tracker.complete({ result: groupsArray });

  return tracker.getSteps();
}
