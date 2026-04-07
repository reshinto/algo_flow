// Union-Find (Disjoint Set Union) — Path Compression + Union by Rank
// Maintains a partition of elements into disjoint sets.
// find(x): returns the root representative of x's set, compressing the path.
// union(x, y): merges the sets containing x and y using rank heuristic.
// Time: O(α(n)) amortized per operation — Space: O(n)

#include <iostream>
#include <vector>
#include <map>

int findRoot(std::vector<int>& parent, int element) {
    // @step:find-root
    if (parent[element] != element) {
        parent[element] = findRoot(parent, parent[element]); // @step:find-root
    }
    return parent[element];
}

void unionSets(std::vector<int>& parent, std::vector<int>& rank, int elemA, int elemB) {
    int rootA = findRoot(parent, elemA); // @step:find-root
    int rootB = findRoot(parent, elemB); // @step:find-root
    if (rootA == rootB) return;

    if (rank[rootA] >= rank[rootB]) {
        parent[rootB] = rootA; // @step:union-sets
        if (rank[rootA] == rank[rootB]) rank[rootA]++;
    } else {
        parent[rootA] = rootB; // @step:union-sets
    }
}

std::vector<std::vector<int>> unionFind(int elementCount, std::vector<std::pair<int,int>> operations) {
    std::vector<int> parent(elementCount); // @step:initialize
    std::vector<int> rank(elementCount, 0); // @step:initialize
    for (int idx = 0; idx < elementCount; idx++) parent[idx] = idx;

    for (auto& [elemA, elemB] : operations) {
        unionSets(parent, rank, elemA, elemB);
    }

    // Build final components
    std::map<int, std::vector<int>> componentMap;
    for (int elemIdx = 0; elemIdx < elementCount; elemIdx++) {
        int root = findRoot(parent, elemIdx);
        componentMap[root].push_back(elemIdx);
    }

    std::vector<std::vector<int>> components;
    for (auto& [root, group] : componentMap) {
        components.push_back(group);
    }
    return components; // @step:complete
}

int main() {
    std::vector<std::pair<int,int>> operations = {{0,1},{2,3},{4,5},{6,7},{0,2},{4,6},{0,4}};
    auto components = unionFind(8, operations);
    for (auto& group : components) {
        for (int val : group) std::cout << val << " ";
        std::cout << "\n";
    }
    return 0;
}
