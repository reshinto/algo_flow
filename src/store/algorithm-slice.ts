/**
 * Zustand slice for algorithm selection and step generation.
 * Owns the currently selected algorithm, its input, and the pre-computed step array.
 */

import type { StateCreator } from "zustand";

import type { AlgorithmDefinition, ExecutionStep } from "@/types";
import { registry } from "@/registry";

/** State and actions for algorithm selection and input management. */
export interface AlgorithmSlice {
  selectedId: string | null;
  definition: AlgorithmDefinition | null;
  input: unknown;
  steps: ExecutionStep[];
  totalSteps: number;

  selectAlgorithm: (id: string) => void;
  setInput: (input: unknown) => void;
  recompute: () => void;
}

/** Factory consumed by the combined Zustand store in `store/index.ts`. */
export const createAlgorithmSlice: StateCreator<AlgorithmSlice> = (set, get) => ({
  selectedId: null,
  definition: null,
  input: null,
  steps: [],
  totalSteps: 0,

  selectAlgorithm: (id: string) => {
    const definition = registry.get(id);
    if (!definition) return;

    // Reset to the algorithm's default input and eagerly build all steps
    const input = definition.meta.defaultInput;
    const steps = definition.generateSteps(input);

    set({
      selectedId: id,
      definition,
      input,
      steps,
      totalSteps: steps.length,
    });
  },

  setInput: (input: unknown) => {
    // Persist the new input then regenerate steps to stay in sync
    set({ input });
    get().recompute();
  },

  recompute: () => {
    const { definition, input } = get();
    if (!definition || input === null) return;

    const steps = definition.generateSteps(input);
    set({ steps, totalSteps: steps.length });
  },
});
