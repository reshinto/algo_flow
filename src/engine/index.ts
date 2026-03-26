import type { AlgorithmDefinition, ExecutionStep } from "@/types";

const MAX_STEPS = 10000;

/** Generate execution steps for an algorithm with safety limits */
export function generateSteps(definition: AlgorithmDefinition, input: unknown): ExecutionStep[] {
  const steps = definition.generateSteps(input);

  if (steps.length > MAX_STEPS) {
    throw new Error(
      `Step limit exceeded: ${steps.length} steps generated (max ${MAX_STEPS}). ` +
        "Use smaller input to reduce step count.",
    );
  }

  return steps;
}
