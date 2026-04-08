// Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find
#include <unordered_map>
#include <vector>
#include <string>
#include <algorithm>
#include <functional>
using namespace std;

struct WeightedEdge {
    string source;
    string target;
    int weight;
};

class Kruskals {
public:
    static vector<WeightedEdge> kruskalsAlgorithm(
        vector<WeightedEdge> edges,
        const vector<string>& nodeIds
    ) {
        vector<WeightedEdge> mstEdges; // @step:initialize
        unordered_map<string, string> parent; // @step:initialize
        unordered_map<string, int> rank; // @step:initialize

        for (const string& nodeId : nodeIds) {
            // @step:initialize
            parent[nodeId] = nodeId; // @step:initialize
            rank[nodeId] = 0; // @step:initialize
        }

        function<string(const string&)> find = [&](const string& nodeId) -> string {
            // @step:initialize
            if (parent[nodeId] != nodeId) {
                // @step:initialize
                parent[nodeId] = find(parent[nodeId]); // @step:initialize
            }
            return parent[nodeId]; // @step:initialize
        };

        auto unionComponents = [&](const string& nodeA, const string& nodeB) -> bool {
            // @step:initialize
            string rootA = find(nodeA); // @step:initialize
            string rootB = find(nodeB); // @step:initialize
            if (rootA == rootB) return false; // @step:initialize
            if (rank[rootA] < rank[rootB]) {
                // @step:initialize
                parent[rootA] = rootB; // @step:initialize
            } else if (rank[rootA] > rank[rootB]) {
                // @step:initialize
                parent[rootB] = rootA; // @step:initialize
            } else {
                // @step:initialize
                parent[rootB] = rootA; // @step:initialize
                rank[rootA]++; // @step:initialize
            }
            return true; // @step:initialize
        };

        sort(edges.begin(), edges.end(), [](const WeightedEdge& edgeA, const WeightedEdge& edgeB) {
            return edgeA.weight < edgeB.weight;
        }); // @step:sort-edges

        for (const WeightedEdge& edge : edges) {
            string sourceRoot = find(edge.source); // @step:visit-edge
            string targetRoot = find(edge.target); // @step:visit-edge

            if (sourceRoot != targetRoot) {
                // @step:visit-edge
                unionComponents(edge.source, edge.target); // @step:add-to-mst
                mstEdges.push_back(edge); // @step:add-to-mst
            } else {
                // Edge would create a cycle — reject it
                (void)edge; // @step:reject-edge
            }

            if ((int)mstEdges.size() == (int)nodeIds.size() - 1) break; // @step:add-to-mst
        }

        return mstEdges; // @step:complete
    }
};
