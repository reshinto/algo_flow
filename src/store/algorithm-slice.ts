/**
 * @file algorithm-slice.ts
 * @module store/algorithm-slice
 *
 * Core Data Engine.
 * Owns the lifecycle of the currently active Algorithm. Handles user input mutations
 * and controls the deterministic Regeneration of execution steps whenever inputs change.
 */
import type { StateCreator } from "zustand";

import type { AlgorithmDefinition, ExecutionStep } from "@/types";
import { registry } from "@/registry";

/**
 * State and actions strictly bound to Algorithm Selection and Execution Array management.
 */
export interface AlgorithmSlice {
  selectedId: string | null;
  definition: AlgorithmDefinition | null;
  input: unknown;
  steps: ExecutionStep[];
  totalSteps: number;

  /** Loads a new algorithm by ID from the global registry and explicitly resets the environment. */
  selectAlgorithm: (id: string) => void;
  /** Persists a user's new input parameter and immediately regenerates the timeline. */
  setInput: (input: unknown) => void;
  /** Re-evaluates the algorithm function locally to construct a fresh `steps` progression array. */
  recompute: () => void;
}

/**
 * Factory consumed by the combined Zustand store.
 */
export const createAlgorithmSlice: StateCreator<AlgorithmSlice> = (set, get) => ({
  selectedId: null,
  definition: null,
  input: null,
  steps: [],
  totalSteps: 0,

  selectAlgorithm: (id: string) => {
    // 1. Fetch from hardcoded registry
    const definition = registry.get(id);
    if (!definition) return;

    // 2. Mount default variables dictated by the Algorithm's meta constraints
    const input = definition.meta.defaultInput;
    // 3. Immediately fully execute the logic offline to cache perfectly deterministic timeline steps
    const steps = definition.generateSteps(input);

    (set as (state: Record<string, unknown>) => void)({
      selectedId: id,
      definition,
      input,
      steps,
      totalSteps: steps.length,
      currentStepIndex: 0,
      isPlaying: false,
    });
  },

  setInput: (input: unknown) => {
    // Stage the new target input (e.g., Array [5,2,9] or targetValue = 9)
    set({ input });
    // Trigger timeline regeneration explicitly based on the new array parameters
    get().recompute();
  },

  recompute: () => {
    const { definition, input } = get();
    // Safety check preventing execution against empty algorithm mounts
    if (!definition || input === null) return;

    const steps = definition.generateSteps(input);
    (set as (state: Record<string, unknown>) => void)({
      steps,
      totalSteps: steps.length,
      currentStepIndex: 0,
      isPlaying: false,
    });
  },
});
