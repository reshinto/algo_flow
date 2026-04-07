// Articulation Points — finds all cut vertices in an undirected graph using DFS with low-link values
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class ArticulationPoints {
public:
    static vector<string> findArticulationPoints(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> discoveryTime; // @step:initialize
        unordered_map<string, int> lowLink; // @step:initialize
        unordered_set<string> articulationPoints; // @step:initialize
        int timer = 0; // @step:initialize

        function<void(const string&, const string*)> dfs =
            [&](const string& nodeId, const string* parentId) {
            discoveryTime[nodeId] = timer; // @step:visit
            lowLink[nodeId] = timer; // @step:visit
            timer++; // @step:visit
            int childCount = 0; // @step:visit

            static const vector<string> emptyVec;
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;

            for (const string& neighborId : neighbors) {
                if (discoveryTime.find(neighborId) == discoveryTime.end()) {
                    childCount++; // @step:visit-edge
                    dfs(neighborId, &nodeId); // @step:visit-edge
                    lowLink[nodeId] = min(lowLink[nodeId], lowLink[neighborId]); // @step:visit-edge

                    // Root with multiple children is an articulation point
                    if (parentId == nullptr && childCount > 1) {
                        articulationPoints.insert(nodeId); // @step:mark-articulation
                    }
                    // Non-root: articulation point if no back edge from subtree
                    if (parentId != nullptr && lowLink[neighborId] >= discoveryTime[nodeId]) {
                        articulationPoints.insert(nodeId); // @step:mark-articulation
                    }
                } else if (parentId == nullptr || neighborId != *parentId) {
                    lowLink[nodeId] = min(lowLink[nodeId], discoveryTime[neighborId]); // @step:visit-edge
                }
            }
        };

        for (const string& nodeId : nodeIds) {
            if (discoveryTime.find(nodeId) == discoveryTime.end()) {
                dfs(nodeId, nullptr); // @step:initialize
            }
        }

        return vector<string>(articulationPoints.begin(), articulationPoints.end()); // @step:complete
    }
};
