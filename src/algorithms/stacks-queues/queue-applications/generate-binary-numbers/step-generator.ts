/** Step generator for Generate Binary Numbers — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const GBN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.GENERATE_BINARY_NUMBERS!);

export interface GenerateBinaryNumbersInput {
  count: number;
}

export function generateBinaryNumbersSteps(input: GenerateBinaryNumbersInput): ExecutionStep[] {
  const { count } = input;
  const tracker = new QueueTracker([], GBN_LINE_MAP);
  const result: string[] = [];

  tracker.initialize({
    count,
    queue: ["1"],
    result: [],
  });

  // Seed the queue with "1" to match the algorithm's initialization
  tracker.enqueue("1", { count, queue: ["1"], result: [] }, "Initialize queue with '1'");

  for (let generationIdx = 0; generationIdx < count; generationIdx++) {
    const current = tracker.dequeue(
      {
        generationIdx,
        result: [...result],
        queueSize: count - generationIdx,
      },
      `Dequeue '${String(generationIdx + 1)}' — process next binary number`,
    );

    result.push(current);

    tracker.enqueue(
      current + "0",
      {
        generationIdx,
        current,
        result: [...result],
      },
      `Enqueue '${current + "0"}' — append '0' to generate next level`,
    );

    tracker.enqueue(
      current + "1",
      {
        generationIdx,
        current,
        result: [...result],
      },
      `Enqueue '${current + "1"}' — append '1' to generate next level`,
    );
  }

  tracker.complete(
    { count, result: [...result] },
    `Generated ${String(count)} binary number${count === 1 ? "" : "s"}: ${result.slice(0, 5).join(", ")}${result.length > 5 ? "..." : ""}`,
  );

  return tracker.getSteps();
}
