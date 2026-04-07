// Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
#include <unordered_map>
#include <vector>
#include <string>
#include <limits>
using namespace std;

using WeightedAdjList = unordered_map<string, vector<pair<string, int>>>;

class FloydWarshall {
public:
    static unordered_map<string, unordered_map<string, int>> floydWarshall(
        const WeightedAdjList& adjacencyList,
        const vector<string>& nodeIds
    ) {
        // Initialize distance matrix
        unordered_map<string, unordered_map<string, int>> distances; // @step:initialize

        for (const string& sourceId : nodeIds) {
            for (const string& targetId : nodeIds) {
                if (sourceId == targetId) {
                    distances[sourceId][targetId] = 0; // @step:initialize
                } else {
                    distances[sourceId][targetId] = numeric_limits<int>::max(); // @step:initialize
                }
            }
        }

        // Set direct edge weights
        static const vector<pair<string, int>> emptyVec;
        for (const string& sourceId : nodeIds) {
            auto neighborIt = adjacencyList.find(sourceId);
            const vector<pair<string, int>>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const auto& neighborEntry : neighbors) {
                distances[sourceId][neighborEntry.first] = neighborEntry.second; // @step:initialize
            }
        }

        // Triple nested loop: try every intermediate node
        for (const string& intermediateId : nodeIds) {
            for (const string& sourceId : nodeIds) {
                for (const string& targetId : nodeIds) {
                    int throughSource = distances[sourceId][intermediateId];
                    int throughTarget = distances[intermediateId][targetId];
                    long long throughIntermediate = (throughSource == numeric_limits<int>::max() ||
                        throughTarget == numeric_limits<int>::max())
                        ? (long long)numeric_limits<int>::max()
                        : (long long)throughSource + throughTarget; // @step:relax-edge
                    if (throughIntermediate < distances[sourceId][targetId]) {
                        distances[sourceId][targetId] = (int)throughIntermediate; // @step:update-distance
                    }
                }
            }
        }

        return distances; // @step:complete
    }
};
