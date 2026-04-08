// Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
#include <unordered_map>
#include <vector>
#include <string>
#include <algorithm>
#include <functional>
using namespace std;

class Bridges {
public:
    static vector<pair<string, string>> findBridges(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> discoveryTime; // @step:initialize
        unordered_map<string, int> lowLink; // @step:initialize
        vector<pair<string, string>> bridges; // @step:initialize
        int timer = 0; // @step:initialize

        function<void(const string&, const string*)> dfs =
            [&](const string& nodeId, const string* parentId) {
            discoveryTime[nodeId] = timer; // @step:visit
            lowLink[nodeId] = timer; // @step:visit
            timer++; // @step:visit

            static const vector<string> emptyVec;
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;

            for (const string& neighborId : neighbors) {
                if (discoveryTime.find(neighborId) == discoveryTime.end()) {
                    dfs(neighborId, &nodeId); // @step:visit-edge
                    lowLink[nodeId] = min(lowLink[nodeId], lowLink[neighborId]); // @step:visit-edge

                    if (lowLink[neighborId] > discoveryTime[nodeId]) {
                        bridges.push_back({nodeId, neighborId}); // @step:mark-bridge
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

        return bridges; // @step:complete
    }
};
