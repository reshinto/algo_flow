// DFS Cycle Detection (Directed) — three-color marking via DFS
// White = unvisited, Gray = in current stack, Black = fully processed
#include <unordered_map>
#include <vector>
#include <string>
#include <functional>
using namespace std;

class DfsCycleDirected {
public:
    static bool dfsCycleDirected(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, string> colorMap; // @step:initialize
        for (const string& nodeId : nodeIds) {
            // @step:initialize
            colorMap[nodeId] = "white"; // @step:initialize
        }

        static const vector<string> emptyVec;

        function<bool(const string&)> dfsVisit = [&](const string& currentNodeId) -> bool {
            colorMap[currentNodeId] = "gray"; // @step:push-stack

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit
            for (const string& neighborId : neighbors) {
                if (colorMap[neighborId] == "gray") {
                    // @step:classify-edge
                    return true; // @step:classify-edge
                }
                if (colorMap[neighborId] == "white") {
                    // @step:classify-edge
                    if (dfsVisit(neighborId)) {
                        // @step:classify-edge
                        return true; // @step:classify-edge
                    }
                }
            }

            colorMap[currentNodeId] = "black"; // @step:process-node
            return false; // @step:process-node
        };

        for (const string& nodeId : nodeIds) {
            if (colorMap[nodeId] == "white") {
                // @step:visit
                if (dfsVisit(nodeId)) {
                    // @step:visit
                    return true; // @step:complete
                }
            }
        }

        return false; // @step:complete
    }
};
