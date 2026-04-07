// Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <limits>
#include <algorithm>
using namespace std;

using WeightedAdjList = unordered_map<string, vector<pair<string, int>>>;

class Dijkstra {
public:
    static unordered_map<string, int> dijkstraShortestPath(
        const WeightedAdjList& adjacencyList,
        const string& startNodeId
    ) {
        unordered_map<string, int> distances; // @step:initialize
        unordered_set<string> visited; // @step:initialize

        // Initialize all distances to max
        for (const auto& entry : adjacencyList) {
            distances[entry.first] = numeric_limits<int>::max(); // @step:initialize
        }
        distances[startNodeId] = 0; // @step:initialize

        // Min-priority queue: {distance, nodeId}
        using PQEntry = pair<int, string>;
        vector<PQEntry> priorityQueue = {{0, startNodeId}}; // @step:initialize

        static const vector<pair<string, int>> emptyVec;

        while (!priorityQueue.empty()) {
            sort(priorityQueue.begin(), priorityQueue.end());
            auto [currentDist, currentNodeId] = priorityQueue.front(); // @step:dequeue
            priorityQueue.erase(priorityQueue.begin()); // @step:dequeue

            if (visited.count(currentNodeId)) continue; // @step:dequeue
            visited.insert(currentNodeId); // @step:visit

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                const string& neighborId = neighborEntry.first;
                int edgeWeight = neighborEntry.second;
                int tentativeDistance = currentDist + edgeWeight; // @step:relax-edge
                int neighborDist = distances.count(neighborId) ? distances[neighborId] : numeric_limits<int>::max();
                if (tentativeDistance < neighborDist) {
                    distances[neighborId] = tentativeDistance; // @step:update-distance
                    priorityQueue.push_back({tentativeDistance, neighborId}); // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }
};
