/**
 * @file index.ts
 * @module registry/index
 *
 * Singleton registry for algorithm definitions.
 *
 * AlgoFlow employs an "Inversion of Control" architecture via this registry.
 * Instead of the UI tightly coupling and importing every algorithm statically
 * (which causes massive bundle sizes and brittle routing), algorithms independently
 * "self-register" their metadata, visualizations, and logic here at initialization time.
 * The UI then dynamically queries this central store to automatically construct navigation,
 * filter lists, and rendering paths.
 */

import type { AlgorithmCategory, AlgorithmDefinition } from "@/types";

class AlgorithmRegistry {
  /** In-memory dictionary mapping a string ID to a fully constructed AlgorithmDefinition */
  private algorithms = new Map<string, AlgorithmDefinition>();

  /**
   * Caches an algorithm definition into the global store.
   * Expected to be invoked once per algorithm within their respective `index.ts` file.
   *
   * @param definition - The heavily-typed algorithm package encompassing meta, execution, and visual logic.
   * @throws {Error} If an algorithm with an identical ID has already been pushed to the registry (prevents silently overwriting).
   */
  register<TInput>(definition: AlgorithmDefinition<TInput>): void {
    if (this.algorithms.has(definition.meta.id)) {
      throw new Error(`Algorithm already registered: ${definition.meta.id}`);
    }
    this.algorithms.set(definition.meta.id, definition as AlgorithmDefinition);
  }

  /**
   * Retrieves an algorithm by its underlying unique identifier.
   *
   * @param id - The string identifier (e.g. `bubble-sort`) matching `ALGORITHM_ID` constants.
   * @returns The fully constructed definition if found, or undefined if the algorithm doesn't exist.
   */
  get(id: string): AlgorithmDefinition | undefined {
    return this.algorithms.get(id);
  }

  /**
   * Produces a flat array of all currently known algorithms.
   * Generally used to power the primary search indices or universal "All Algorithms" views.
   *
   * @returns Unordered array of algorithm definitions.
   */
  getAll(): AlgorithmDefinition[] {
    return Array.from(this.algorithms.values());
  }

  /**
   * Retrieves a grouped slice of algorithms that sit under a specific computational category.
   *
   * @param category - The string category (e.g. `dynamic-programming`).
   * @returns A subset array of algorithms strictly matching the criteria, used for sub-navigation.
   */
  getByCategory(category: AlgorithmCategory): AlgorithmDefinition[] {
    return this.getAll().filter((definition) => definition.meta.category === category);
  }

  /**
   * Filters the global registry based on the specific mechanical technique.
   * Not all algorithms specify a technique, so this is used for advanced filtering rather than root navigation.
   *
   * @param technique - The methodology keyword (e.g. `sliding-window`, `two-pointer`).
   * @returns Array of algorithms employing this mechanical strategy.
   */
  getByTechnique(technique: string): AlgorithmDefinition[] {
    return this.getAll().filter((algo) => algo.meta.technique === technique);
  }

  /**
   * Scans the entirety of registered algorithms to aggregate a distinct list of active categories.
   * Used dynamically to populate the Sidebar without requiring hardcoded category enum blocks.
   *
   * @returns An array of string keys representing the root groupings of the current system.
   */
  getCategories(): AlgorithmCategory[] {
    const categories = new Set<AlgorithmCategory>();
    for (const definition of this.algorithms.values()) {
      categories.add(definition.meta.category);
    }
    return Array.from(categories);
  }

  /**
   * Deletes all items from the active in-memory dictionary.
   *
   * @internal Used exclusively during teardown in unit-testing suites to ensure scope isolation between tests.
   */
  clear(): void {
    this.algorithms.clear();
  }
}

/** The globally scoped, immutable instance of the registry. */
export const registry = new AlgorithmRegistry();
