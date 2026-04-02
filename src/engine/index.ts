/**
 * @file index.ts
 * @module engine/index
 *
 * The Execution Engine module.
 * This acts as the runtime safeguard and orchestrator for algorithm execution.
 * Rather than allowing algorithms to run unbounded (which could freeze the UI
 * in the case of infinite loops or excessively large inputs), the engine restricts
 * step generation within a strict safety limit.
 */
import type { AlgorithmDefinition, ExecutionStep } from "@/types";

/**
 * Absolute upper bound for algorithm step generation.
 * Prevents main-thread blocking and browser memory exceptions.
 */
const MAX_STEPS = 10000;

/**
 * Safely generates the discrete execution timeline for a given algorithm.
 *
 * Invokes the algorithm's raw `generateSteps` method while wrapping it in
 * a circuit breaker logic. If the algorithm yields more steps than `MAX_STEPS`,
 * the process halts violently before trying to render an astronomical dataset
 * in the UI.
 *
 * @param definition - The registered algorithm configuration blueprint.
 * @param input - The strictly typed argument(s) passed into the algorithm execution.
 * @returns The full ordered array of chronological ExecutionSteps to feed into the Playback Slice.
 * @throws {Error} If the generated steps exceed the safe `MAX_STEPS` boundary.
 */
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
