// Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <queue>
#include <limits>
#include <functional>
using namespace std;

struct FlowEdge {
    string target;
    int capacity;
};

class EdmondsKarp {
public:
    static int edmondsKarp(
        const unordered_map<string, vector<FlowEdge>>& adjacencyList,
        const string& sourceNodeId,
        const string& sinkNodeId
    ) {
        unordered_map<string, unordered_map<string, int>> residualCapacity; // @step:initialize
        for (const auto& entry : adjacencyList) {
            residualCapacity[entry.first];
            for (const FlowEdge& flowEdge : entry.second) {
                int prev = residualCapacity[entry.first].count(flowEdge.target)
                    ? residualCapacity[entry.first][flowEdge.target] : 0;
                residualCapacity[entry.first][flowEdge.target] = prev + flowEdge.capacity; // @step:initialize
                residualCapacity[flowEdge.target];
            }
        }

        int maxFlow = 0; // @step:initialize

        // BFS to find shortest augmenting path; returns parent map or empty if no path
        auto bfsFindPath = [&]() -> unordered_map<string, string> {
            unordered_map<string, string> parentMap; // @step:enqueue
            unordered_set<string> visitedSet = {sourceNodeId}; // @step:enqueue
            queue<string> nodeQueue; // @step:enqueue
            nodeQueue.push(sourceNodeId); // @step:enqueue

            while (!nodeQueue.empty()) {
                string currentId = nodeQueue.front(); // @step:dequeue
                nodeQueue.pop(); // @step:dequeue
                for (const auto& neighborEntry : residualCapacity[currentId]) { // @step:visit-node
                    const string& neighborId = neighborEntry.first;
                    int residual = neighborEntry.second; // @step:visit-node
                    if (!visitedSet.count(neighborId) && residual > 0) {
                        visitedSet.insert(neighborId); // @step:enqueue
                        parentMap[neighborId] = currentId; // @step:enqueue
                        nodeQueue.push(neighborId); // @step:enqueue
                        if (neighborId == sinkNodeId) return parentMap; // @step:enqueue
                    }
                }
            }
            return {}; // @step:dequeue
        };

        unordered_map<string, string> parentMap = bfsFindPath(); // @step:augment-flow
        while (!parentMap.empty()) {
            // Find bottleneck capacity along the path
            int bottleneck = numeric_limits<int>::max(); // @step:augment-flow
            string currentId = sinkNodeId; // @step:augment-flow
            while (currentId != sourceNodeId) {
                string parentId = parentMap[currentId]; // @step:augment-flow
                int residual = residualCapacity.count(parentId) && residualCapacity[parentId].count(currentId)
                    ? residualCapacity[parentId][currentId] : 0; // @step:augment-flow
                bottleneck = min(bottleneck, residual); // @step:augment-flow
                currentId = parentId; // @step:augment-flow
            }

            // Update residual capacities along the path
            currentId = sinkNodeId; // @step:augment-flow
            while (currentId != sourceNodeId) {
                string parentId = parentMap[currentId]; // @step:augment-flow
                int fwd = residualCapacity[parentId].count(currentId)
                    ? residualCapacity[parentId][currentId] : 0; // @step:augment-flow
                residualCapacity[parentId][currentId] = fwd - bottleneck; // @step:augment-flow
                int back = residualCapacity[currentId].count(parentId)
                    ? residualCapacity[currentId][parentId] : 0; // @step:augment-flow
                residualCapacity[currentId][parentId] = back + bottleneck; // @step:augment-flow
                currentId = parentId; // @step:augment-flow
            }

            maxFlow += bottleneck; // @step:augment-flow
            parentMap = bfsFindPath(); // @step:augment-flow
        }

        return maxFlow; // @step:complete
    }
};
