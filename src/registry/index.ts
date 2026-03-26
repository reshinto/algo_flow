/* Singleton registry for algorithm definitions. Algorithms self-register at import
   time via registry.register(), and the UI queries this registry to discover
   available algorithms without any algorithm-specific coupling. */

import type { AlgorithmCategory, AlgorithmDefinition } from "@/types";

class AlgorithmRegistry {
  private algorithms = new Map<string, AlgorithmDefinition>();

  register<TInput>(definition: AlgorithmDefinition<TInput>): void {
    if (this.algorithms.has(definition.meta.id)) {
      throw new Error(`Algorithm already registered: ${definition.meta.id}`);
    }
    this.algorithms.set(definition.meta.id, definition as AlgorithmDefinition);
  }

  get(id: string): AlgorithmDefinition | undefined {
    return this.algorithms.get(id);
  }

  getAll(): AlgorithmDefinition[] {
    return Array.from(this.algorithms.values());
  }

  getByCategory(category: AlgorithmCategory): AlgorithmDefinition[] {
    return this.getAll().filter((definition) => definition.meta.category === category);
  }

  getCategories(): AlgorithmCategory[] {
    const categories = new Set<AlgorithmCategory>();
    for (const definition of this.algorithms.values()) {
      categories.add(definition.meta.category);
    }
    return Array.from(categories);
  }

  /** For testing only - clears all registered algorithms */
  clear(): void {
    this.algorithms.clear();
  }
}

export const registry = new AlgorithmRegistry();
