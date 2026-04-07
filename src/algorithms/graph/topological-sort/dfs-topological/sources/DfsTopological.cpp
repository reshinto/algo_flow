// DFS Topological Sort — post-order DFS, prepend finished nodes to result
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <functional>
using namespace std;

class DfsTopological {
public:
    static vector<string> dfsTopologicalSort(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_set<string> visitedSet; // @step:initialize
        vector<string> topologicalOrder; // @step:initialize

        static const vector<string> emptyVec;

        function<void(const string&)> dfsVisit = [&](const string& currentNodeId) {
            visitedSet.insert(currentNodeId); // @step:visit
            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    // @step:push-stack
                    dfsVisit(neighborId); // @step:push-stack
                }
            }
            topologicalOrder.insert(topologicalOrder.begin(), currentNodeId); // @step:add-to-order
        };

        for (const string& nodeId : nodeIds) {
            if (!visitedSet.count(nodeId)) {
                // @step:push-stack
                dfsVisit(nodeId); // @step:push-stack
            }
        }

        return topologicalOrder; // @step:complete
    }
};
