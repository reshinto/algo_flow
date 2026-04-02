// Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
// Maintains a partition of elements into disjoint sets.
// find(x): returns the root representative of x's set, compressing the path.
// union(x, y): merges the sets containing x and y using rank heuristic.
// Time: O(α(n)) amortized per operation — Space: O(n)

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UnionFind {

    private int[] parent;
    private int[] rank;

    public UnionFind(int elementCount) {
        parent = new int[elementCount]; // @step:initialize
        rank = new int[elementCount]; // @step:initialize
        for (int idx = 0; idx < elementCount; idx++) {
            parent[idx] = idx;
        }
    }

    public int find(int element) { // @step:find-root
        if (parent[element] != element) {
            parent[element] = find(parent[element]); // @step:find-root
        }
        return parent[element];
    }

    public void union(int elemA, int elemB) {
        int rootA = find(elemA); // @step:find-root
        int rootB = find(elemB); // @step:find-root
        if (rootA == rootB) return;

        if (rank[rootA] >= rank[rootB]) {
            parent[rootB] = rootA; // @step:union-sets
            if (rank[rootA] == rank[rootB]) rank[rootA]++;
        } else {
            parent[rootA] = rootB; // @step:union-sets
        }
    }

    public static Map<String, Object> unionFind(int elementCount, int[][] operations) {
        UnionFind uf = new UnionFind(elementCount);

        for (int[] operation : operations) {
            uf.union(operation[0], operation[1]);
        }

        // Build final components
        Map<Integer, List<Integer>> componentMap = new HashMap<>();
        for (int elemIdx = 0; elemIdx < elementCount; elemIdx++) {
            int root = uf.find(elemIdx);
            componentMap.computeIfAbsent(root, k -> new ArrayList<>()).add(elemIdx);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("components", new ArrayList<>(componentMap.values())); // @step:complete
        return result;
    }
}
