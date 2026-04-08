// Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
#include <unordered_map>
#include <vector>
#include <string>
#include <limits>
using namespace std;

using WeightedAdjList = unordered_map<string, vector<pair<string, int>>>;

class BellmanFord {
public:
    static unordered_map<string, int> bellmanFord(
        const WeightedAdjList& adjacencyList,
        const string& startNodeId,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> distances; // @step:initialize

        for (const string& nodeId : nodeIds) {
            distances[nodeId] = numeric_limits<int>::max(); // @step:initialize
        }
        distances[startNodeId] = 0; // @step:initialize

        int vertexCount = (int)nodeIds.size();

        static const vector<pair<string, int>> emptyVec;

        // Relax all edges (V - 1) times
        for (int passIndex = 0; passIndex < vertexCount - 1; passIndex++) {
            for (const string& sourceId : nodeIds) {
                auto neighborIt = adjacencyList.find(sourceId);
                const vector<pair<string, int>>& neighbors =
                    (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
                for (const auto& neighborEntry : neighbors) {
                    const string& targetId = neighborEntry.first;
                    int edgeWeight = neighborEntry.second;
                    int sourceDist = distances.count(sourceId) ? distances[sourceId] : numeric_limits<int>::max();
                    if (sourceDist == numeric_limits<int>::max()) continue; // @step:visit-edge
                    int tentativeDistance = sourceDist + edgeWeight; // @step:relax-edge
                    int targetDist = distances.count(targetId) ? distances[targetId] : numeric_limits<int>::max();
                    if (tentativeDistance < targetDist) {
                        distances[targetId] = tentativeDistance; // @step:update-distance
                    }
                }
            }
        }

        // Detect negative cycles — one more pass; any improvement means a negative cycle
        for (const string& sourceId : nodeIds) {
            auto neighborIt = adjacencyList.find(sourceId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                const string& targetId = neighborEntry.first;
                int edgeWeight = neighborEntry.second;
                int sourceDist = distances.count(sourceId) ? distances[sourceId] : numeric_limits<int>::max();
                if (sourceDist == numeric_limits<int>::max()) continue;
                int targetDist = distances.count(targetId) ? distances[targetId] : numeric_limits<int>::max();
                if (sourceDist + edgeWeight < targetDist) {
                    distances[targetId] = numeric_limits<int>::min(); // @step:update-distance
                }
            }
        }

        return distances; // @step:complete
    }
};
