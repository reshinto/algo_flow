// Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
// Maintains a partition of elements into disjoint sets.
// find(x): returns the root representative of x's set, compressing the path.
// union(x, y): merges the sets containing x and y using rank heuristic.
// Time: O(α(n)) amortized per operation — Space: O(n)

function unionFind(
  elementCount: number,
  operations: [number, number][],
): { components: number[][] } {
  const parent: number[] = Array.from({ length: elementCount }, (_, idx) => idx); // @step:initialize
  const rank: number[] = Array.from({ length: elementCount }, () => 0); // @step:initialize

  function find(element: number): number {
    // @step:find-root
    if (parent[element] !== element) {
      parent[element] = find(parent[element]!); // @step:find-root
    }
    return parent[element]!;
  }

  function union(elemA: number, elemB: number): void {
    const rootA = find(elemA); // @step:find-root
    const rootB = find(elemB); // @step:find-root
    if (rootA === rootB) return;

    if (rank[rootA]! >= rank[rootB]!) {
      parent[rootB] = rootA; // @step:union-sets
      if (rank[rootA] === rank[rootB]) rank[rootA]!++;
    } else {
      parent[rootA] = rootB; // @step:union-sets
    }
  }

  for (const [elemA, elemB] of operations) {
    union(elemA, elemB);
  }

  // Build final components
  const componentMap = new Map<number, number[]>();
  for (let elemIdx = 0; elemIdx < elementCount; elemIdx++) {
    const root = find(elemIdx);
    if (!componentMap.has(root)) componentMap.set(root, []);
    componentMap.get(root)!.push(elemIdx);
  }
  return { components: Array.from(componentMap.values()) }; // @step:complete
}
