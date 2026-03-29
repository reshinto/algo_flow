/** Step generator for Boyer-Moore Voting Algorithm — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.BOYER_MOORE_VOTING!);

interface BoyerMooreVotingInput {
  inputArray: number[];
}

export function generateBoyerMooreVotingSteps(input: BoyerMooreVotingInput): ExecutionStep[] {
  const { inputArray } = input;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  if (inputArray.length === 0) {
    tracker.initialize({ arrayLength: 0 });
    tracker.complete({ majorityElement: -1, count: 0 });
    return tracker.getSteps();
  }

  let candidate = inputArray[0]!;
  let voteCount = 0;

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength: inputArray.length,
    candidate,
    voteCount,
  });

  for (let elementIndex = 0; elementIndex < inputArray.length; elementIndex++) {
    const currentElement = inputArray[elementIndex]!;

    if (voteCount === 0) {
      candidate = currentElement;
      voteCount = 1;

      tracker.markElement(
        elementIndex,
        "found",
        {
          candidate,
          voteCount,
          currentElement,
          action: "set-candidate",
        },
        `Count is 0 — set new candidate to ${candidate}`,
        "compare",
      );
    } else if (currentElement === candidate) {
      voteCount++;

      tracker.visit(
        elementIndex,
        {
          candidate,
          voteCount,
          currentElement,
          action: "increment",
        },
        `Element ${currentElement} matches candidate — vote count up to ${voteCount}`,
      );
    } else {
      voteCount--;

      const action = voteCount === 0 ? "eliminated" : "default";

      tracker.markElement(
        elementIndex,
        action,
        {
          candidate,
          voteCount,
          currentElement,
          action: "decrement",
        },
        `Element ${currentElement} differs — vote count down to ${voteCount}`,
        "visit",
      );
    }
  }

  tracker.complete({
    majorityElement: candidate,
    count: voteCount,
  });

  return tracker.getSteps();
}
