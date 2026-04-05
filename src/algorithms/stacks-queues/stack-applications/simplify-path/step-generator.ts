/** Step generator for Simplify Path — produces ExecutionStep[] using StackQueueTracker. */

import type { ExecutionStep } from "@/types";
import { StackQueueTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const SP_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.SIMPLIFY_PATH!);

export interface SimplifyPathInput {
  inputString: string;
}

export function generateSimplifyPathSteps(input: SimplifyPathInput): ExecutionStep[] {
  const { inputString } = input;
  const tracker = new StackQueueTracker(inputString, SP_LINE_MAP);
  const dirStack: string[] = [];

  tracker.initialize({ inputString });

  const components = inputString.split("/");

  // Track the character offset for each component start within the original string
  let charOffset = 0;

  for (let partIdx = 0; partIdx < components.length; partIdx++) {
    const component = components[partIdx]!;
    const componentStart = charOffset;

    // Advance charOffset past this component and the following "/" separator
    charOffset += component.length + 1;

    if (component === "" || component === ".") {
      // Skip empty segments and current-directory markers
      if (component.length > 0) {
        // "." is a single visible char — mark it as visited then skip
        tracker.processChar(componentStart, { partIdx, component, action: "skip" });
      }
      continue;
    }

    if (component === "..") {
      // Mark first char of ".." as current before deciding what to do
      tracker.processChar(componentStart, { partIdx, component });
      if (dirStack.length > 0) {
        const popped = dirStack.pop();
        tracker.popMatched(component, componentStart, {
          partIdx,
          component,
          popped,
          stackSize: dirStack.length,
        });
      }
      // else: ".." at root is silently ignored — no additional step needed
    } else {
      // Valid directory name
      tracker.processChar(componentStart, { partIdx, component });
      dirStack.push(component);
      tracker.push(component, componentStart, {
        partIdx,
        component,
        stackSize: dirStack.length,
      });
    }
  }

  const simplifiedPath = "/" + dirStack.join("/");
  tracker.complete(true, { simplifiedPath, stackSize: dirStack.length });

  return tracker.getSteps();
}
