/** Step generator for Flatten Nested List Iterator — produces ExecutionStep[] using QueueTracker. */

import type { ExecutionStep } from "@/types";
import { QueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const FNLI_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.FLATTEN_NESTED_LIST_ITERATOR!);

type NestedItem = number | NestedItem[];

export interface FlattenNestedListIteratorInput {
  nestedList: NestedItem[];
}

function nestedItemLabel(item: NestedItem): string {
  if (typeof item === "number") return String(item);
  return "[" + item.map(nestedItemLabel).join(",") + "]";
}

export function generateFlattenNestedListIteratorSteps(
  input: FlattenNestedListIteratorInput,
): ExecutionStep[] {
  const { nestedList } = input;
  const tracker = new QueueTracker([], FNLI_LINE_MAP);
  const result: number[] = [];

  // Build initial stack in reverse so first element is on top
  const stack: NestedItem[] = [...nestedList].reverse();

  tracker.initialize({
    stack: stack.map(nestedItemLabel),
    result: [],
  });

  // Push initial items onto the tracker stack (in reverse — bottom first so visual stack top matches)
  for (let initIdx = stack.length - 1; initIdx >= 0; initIdx--) {
    tracker.pushToStack(
      nestedItemLabel(stack[initIdx]!),
      { stack: stack.map(nestedItemLabel), result: [] },
      `Push ${nestedItemLabel(stack[initIdx]!)} onto the stack`,
    );
  }

  while (stack.length > 0) {
    const top = stack.pop()!;
    const topLabel = nestedItemLabel(top);

    tracker.popFromStack(
      { stack: stack.map(nestedItemLabel), result: [...result] },
      `Pop ${topLabel} from the stack`,
    );

    if (typeof top === "number") {
      result.push(top);
      tracker.enqueue(
        String(top),
        { stack: stack.map(nestedItemLabel), result: [...result] },
        `${topLabel} is a number — collect it into result`,
      );
    } else {
      // Push elements of the sub-array in reverse order
      for (let itemIdx = top.length - 1; itemIdx >= 0; itemIdx--) {
        const subItem = top[itemIdx]!;
        stack.push(subItem);
        tracker.pushToStack(
          nestedItemLabel(subItem),
          { stack: stack.map(nestedItemLabel), result: [...result] },
          `Expand array — push ${nestedItemLabel(subItem)} onto the stack`,
        );
      }
    }
  }

  tracker.complete({ result: [...result] }, `Flattened to [${result.join(", ")}]`);

  return tracker.getSteps();
}
