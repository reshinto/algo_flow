// Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
#include <unordered_map>
#include <vector>
#include <string>
#include <functional>
using namespace std;

struct EdgePair {
    string source;
    string target;
};

class UnionFindCycle {
public:
    static bool unionFindCycle(
        const vector<EdgePair>& edges,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, string> parent; // @step:initialize
        unordered_map<string, int> rank; // @step:initialize
        for (const string& nodeId : nodeIds) {
            // @step:initialize
            parent[nodeId] = nodeId; // @step:initialize
            rank[nodeId] = 0; // @step:initialize
        }

        function<string(const string&)> findRoot = [&](const string& nodeId) -> string {
            if (parent[nodeId] != nodeId) {
                parent[nodeId] = findRoot(parent[nodeId]);
            }
            return parent[nodeId];
        };

        auto unionComponents = [&](const string& nodeA, const string& nodeB) {
            string rootA = findRoot(nodeA);
            string rootB = findRoot(nodeB);
            if (rank[rootA] < rank[rootB]) {
                parent[rootA] = rootB;
            } else if (rank[rootA] > rank[rootB]) {
                parent[rootB] = rootA;
            } else {
                parent[rootB] = rootA;
                rank[rootA]++;
            }
        };

        for (const EdgePair& edge : edges) {
            string sourceRoot = findRoot(edge.source); // @step:visit-edge
            string targetRoot = findRoot(edge.target); // @step:visit-edge

            if (sourceRoot == targetRoot) {
                // @step:visit-edge
                return true; // @step:complete
            }

            unionComponents(edge.source, edge.target); // @step:merge-components
        }

        return false; // @step:complete
    }
};
