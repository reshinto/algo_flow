/** Step generator for Isomorphic Strings — produces ExecutionStep[] using HashMapTracker. */

import type { ExecutionStep } from "@/types";
import { HashMapTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const ISOMORPHIC_STRINGS_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.ISOMORPHIC_STRINGS!);

export interface IsomorphicStringsInput {
  textA: string;
  textB: string;
}

export function generateIsomorphicStringsSteps(input: IsomorphicStringsInput): ExecutionStep[] {
  const { textA, textB } = input;
  const charsA = textA.split("");
  const charsB = textB.split("");
  const tracker = new HashMapTracker(charsA, ISOMORPHIC_STRINGS_LINE_MAP, {
    secondaryInput: charsB,
  });
  const aToB = new Map<string, string>();
  const bToA = new Map<string, string>();

  tracker.initialize({ textA, textB });

  if (textA.length !== textB.length) {
    tracker.setResult(false);
    tracker.complete({ result: false });
    return tracker.getSteps();
  }

  for (let charIndex = 0; charIndex < charsA.length; charIndex++) {
    const charA = charsA[charIndex]!;
    const charB = charsB[charIndex]!;

    tracker.processElement(charIndex, { charIndex, charA, charB });
    tracker.processSecondaryElement(charIndex, { charIndex, charB, charA });

    const mappedB = aToB.get(charA);
    const mappedA = bToA.get(charB);

    tracker.lookupKey(charA, { charA, mappedB });

    if (mappedB === undefined && mappedA === undefined) {
      aToB.set(charA, charB);
      bToA.set(charB, charA);
      tracker.insertKey(charA, charB, { charA, charB });
      tracker.markMatched(charIndex, { charA, charB });
      tracker.markSecondaryMatched(charIndex, { charB, charA });
    } else if (mappedB === charB && mappedA === charA) {
      tracker.keyFound(charA, 0, charIndex, { charA, charB, mappedB });
      tracker.markMatched(charIndex, { charA, charB });
    } else {
      tracker.keyNotFound(charA, { charA, charB, mappedB, mappedA });
      tracker.markMismatched(charIndex, { charA, charB });
      tracker.setResult(false);
      tracker.complete({ result: false });
      return tracker.getSteps();
    }
  }

  tracker.setResult(true);
  tracker.complete({ result: true });
  return tracker.getSteps();
}
