// DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
// using topological sort followed by edge relaxation in topological order
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <limits>
#include <functional>
using namespace std;

using WeightedAdjList = unordered_map<string, vector<pair<string, int>>>;

class DagShortestPath {
public:
    static unordered_map<string, int> dagShortestPath(
        const WeightedAdjList& adjacencyList,
        const string& startNodeId,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> distances; // @step:initialize
        for (const string& nodeId : nodeIds) {
            distances[nodeId] = numeric_limits<int>::max(); // @step:initialize
        }
        distances[startNodeId] = 0; // @step:initialize

        // Topological sort via DFS
        unordered_set<string> visited; // @step:initialize
        vector<string> topologicalOrder; // @step:initialize

        static const vector<pair<string, int>> emptyVec;

        function<void(const string&)> dfsVisit = [&](const string& nodeId) {
            visited.insert(nodeId);
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                if (!visited.count(neighborEntry.first)) {
                    dfsVisit(neighborEntry.first);
                }
            }
            topologicalOrder.insert(topologicalOrder.begin(), nodeId); // @step:add-to-order
        };

        for (const string& nodeId : nodeIds) {
            if (!visited.count(nodeId)) {
                dfsVisit(nodeId);
            }
        }

        // Relax edges in topological order
        for (const string& nodeId : topologicalOrder) {
            if (distances[nodeId] == numeric_limits<int>::max()) continue; // @step:process-node
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                const string& neighborId = neighborEntry.first;
                int edgeWeight = neighborEntry.second;
                int tentativeDistance = distances[nodeId] + edgeWeight; // @step:relax-edge
                int neighborDist = distances.count(neighborId) ? distances[neighborId] : numeric_limits<int>::max();
                if (tentativeDistance < neighborDist) {
                    distances[neighborId] = tentativeDistance; // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }
};
