// Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <limits>
#include <functional>
using namespace std;

struct FlowEdge {
    string target;
    int capacity;
};

class FordFulkerson {
public:
    static int fordFulkerson(
        const unordered_map<string, vector<FlowEdge>>& adjacencyList,
        const string& sourceNodeId,
        const string& sinkNodeId
    ) {
        if (sourceNodeId == sinkNodeId) return 0; // @step:initialize

        unordered_map<string, unordered_map<string, int>> residualCapacity; // @step:initialize
        for (const auto& entry : adjacencyList) {
            residualCapacity[entry.first];
        } // @step:initialize
        for (const auto& entry : adjacencyList) {
            for (const FlowEdge& flowEdge : entry.second) {
                residualCapacity[flowEdge.target];
                int prev = residualCapacity[entry.first].count(flowEdge.target)
                    ? residualCapacity[entry.first][flowEdge.target] : 0;
                residualCapacity[entry.first][flowEdge.target] = prev + flowEdge.capacity; // @step:initialize
            }
        }

        int maxFlow = 0; // @step:initialize

        function<int(const string&, unordered_set<string>&, int)> dfsAugment =
            [&](const string& currentId, unordered_set<string>& visitedSet, int bottleneck) -> int {
            if (currentId == sinkNodeId) return bottleneck; // @step:dfs-augment
            visitedSet.insert(currentId); // @step:dfs-augment
            for (const auto& neighborEntry : residualCapacity[currentId]) { // @step:visit-edge
                const string& neighborId = neighborEntry.first;
                int residual = neighborEntry.second; // @step:visit-edge
                if (!visitedSet.count(neighborId) && residual > 0) {
                    int flow = dfsAugment(neighborId, visitedSet, min(bottleneck, residual)); // @step:augment-flow
                    if (flow > 0) {
                        residualCapacity[currentId][neighborId] = residual - flow; // @step:augment-flow
                        int back = residualCapacity[neighborId].count(currentId)
                            ? residualCapacity[neighborId][currentId] : 0;
                        residualCapacity[neighborId][currentId] = back + flow; // @step:augment-flow
                        return flow; // @step:augment-flow
                    }
                }
            }
            return 0; // @step:dfs-augment
        };

        while (true) {
            unordered_set<string> visitedSet; // @step:augment-flow
            int pathFlow = dfsAugment(sourceNodeId, visitedSet, numeric_limits<int>::max()); // @step:augment-flow
            if (pathFlow == 0) break; // @step:augment-flow
            maxFlow += pathFlow; // @step:augment-flow
        }

        return maxFlow; // @step:complete
    }
};
