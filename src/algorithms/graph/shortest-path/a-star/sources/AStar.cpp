// A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <limits>
#include <algorithm>
using namespace std;

using WeightedAdjList = unordered_map<string, vector<pair<string, int>>>;

class AStar {
public:
    static vector<string> aStarSearch(
        const WeightedAdjList& adjacencyList,
        const string& startNodeId,
        const string& targetNodeId,
        const unordered_map<string, int>& heuristic
    ) {
        unordered_map<string, int> gCosts; // @step:initialize
        unordered_map<string, string> predecessors; // @step:initialize
        unordered_set<string> visited; // @step:initialize

        for (const auto& entry : adjacencyList) {
            gCosts[entry.first] = numeric_limits<int>::max(); // @step:initialize
            predecessors[entry.first] = ""; // @step:initialize
        }
        gCosts[startNodeId] = 0; // @step:initialize

        // Open set as priority queue: {fCost, nodeId}
        using PQEntry = pair<int, string>;
        int hStart = heuristic.count(startNodeId) ? heuristic.at(startNodeId) : 0;
        vector<PQEntry> openQueue = {{hStart, startNodeId}}; // @step:initialize

        static const vector<pair<string, int>> emptyVec;

        while (!openQueue.empty()) {
            sort(openQueue.begin(), openQueue.end());
            auto [fCostUnused, currentNodeId] = openQueue.front(); // @step:dequeue
            openQueue.erase(openQueue.begin()); // @step:dequeue

            if (visited.count(currentNodeId)) continue; // @step:dequeue
            visited.insert(currentNodeId); // @step:visit

            if (currentNodeId == targetNodeId) {
                // Reconstruct path
                vector<string> path;
                string traceId = currentNodeId;
                while (!traceId.empty()) {
                    path.insert(path.begin(), traceId);
                    traceId = predecessors.count(traceId) ? predecessors[traceId] : "";
                }
                return path; // @step:complete
            }

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                const string& neighborId = neighborEntry.first;
                int edgeWeight = neighborEntry.second;
                if (visited.count(neighborId)) continue;
                int currentG = gCosts.count(currentNodeId) ? gCosts[currentNodeId] : numeric_limits<int>::max();
                int tentativeGCost = (currentG == numeric_limits<int>::max()) ? numeric_limits<int>::max()
                    : currentG + edgeWeight; // @step:relax-edge
                int neighborG = gCosts.count(neighborId) ? gCosts[neighborId] : numeric_limits<int>::max();
                if (tentativeGCost < neighborG) {
                    gCosts[neighborId] = tentativeGCost; // @step:update-distance
                    predecessors[neighborId] = currentNodeId; // @step:update-distance
                    int fCost = tentativeGCost + (heuristic.count(neighborId) ? heuristic.at(neighborId) : 0);
                    openQueue.push_back({fCost, neighborId}); // @step:update-distance
                }
            }
        }

        return {}; // @step:complete
    }
};
