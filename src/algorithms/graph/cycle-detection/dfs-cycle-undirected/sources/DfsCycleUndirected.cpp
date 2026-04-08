// DFS Cycle Detection (Undirected) — parent tracking to identify back edges
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <functional>
using namespace std;

class DfsCycleUndirected {
public:
    static bool dfsCycleUndirected(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_set<string> visitedSet; // @step:initialize

        static const vector<string> emptyVec;

        function<bool(const string&, const string*)> dfsVisit =
            [&](const string& currentNodeId, const string* parentNodeId) -> bool {
            visitedSet.insert(currentNodeId); // @step:push-stack

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    // @step:classify-edge
                    if (dfsVisit(neighborId, &currentNodeId)) {
                        // @step:classify-edge
                        return true; // @step:classify-edge
                    }
                } else if (parentNodeId == nullptr || neighborId != *parentNodeId) {
                    // @step:classify-edge
                    return true; // @step:classify-edge
                }
            }

            return false; // @step:pop-stack
        };

        for (const string& nodeId : nodeIds) {
            if (!visitedSet.count(nodeId)) {
                // @step:visit
                if (dfsVisit(nodeId, nullptr)) {
                    // @step:visit
                    return true; // @step:complete
                }
            }
        }

        return false; // @step:complete
    }
};
