// Borůvka's Algorithm — each component finds its cheapest outgoing edge each round
#include <unordered_map>
#include <vector>
#include <string>
#include <functional>
#include <limits>
using namespace std;

struct WeightedEdge {
    string source;
    string target;
    int weight;
};

class Boruvkas {
public:
    static vector<WeightedEdge> boruvkasAlgorithm(
        const vector<WeightedEdge>& edges,
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

        auto unionComponents = [&](const string& nodeA, const string& nodeB) {
            // @step:initialize
            string rootA = find(nodeA); // @step:initialize
            string rootB = find(nodeB); // @step:initialize
            if (rootA == rootB) return; // @step:initialize
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
        };

        int componentCount = (int)nodeIds.size();

        while (componentCount > 1) {
            unordered_map<string, int> cheapestEdgeIndex; // @step:visit-edge

            for (int edgeIdx = 0; edgeIdx < (int)edges.size(); edgeIdx++) {
                const WeightedEdge& edge = edges[edgeIdx];
                string sourceRoot = find(edge.source); // @step:visit-edge
                string targetRoot = find(edge.target); // @step:visit-edge

                if (sourceRoot == targetRoot) continue; // @step:visit-edge

                auto updateCheapest = [&](const string& root) {
                    // @step:visit-edge
                    auto it = cheapestEdgeIndex.find(root);
                    if (it == cheapestEdgeIndex.end() || edge.weight < edges[it->second].weight) {
                        cheapestEdgeIndex[root] = edgeIdx; // @step:visit-edge
                    }
                };
                updateCheapest(sourceRoot);
                updateCheapest(targetRoot);
            }

            for (const auto& entry : cheapestEdgeIndex) {
                const WeightedEdge& cheapest = edges[entry.second];
                string sourceRoot = find(cheapest.source); // @step:add-to-mst
                string targetRoot = find(cheapest.target); // @step:add-to-mst
                if (sourceRoot == targetRoot) continue; // @step:add-to-mst
                unionComponents(cheapest.source, cheapest.target); // @step:merge-components
                mstEdges.push_back(cheapest); // @step:add-to-mst
                componentCount--; // @step:merge-components
            }
        }

        return mstEdges; // @step:complete
    }
};
