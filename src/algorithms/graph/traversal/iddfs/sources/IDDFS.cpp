// IDDFS — iterative deepening depth-first search using increasing depth limits
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class IDDFS {
public:
    static vector<string> iterativeDeepeningDFS(
        const unordered_map<string, vector<string>>& adjacencyList,
        const string& startNodeId,
        int maxDepth = -1
    ) {
        vector<string> visitOrder; // @step:initialize
        int resolvedMaxDepth = (maxDepth < 0) ? (int)adjacencyList.size() : maxDepth; // @step:initialize

        static const vector<string> emptyVec;

        for (int depthLimit = 0; depthLimit <= resolvedMaxDepth; depthLimit++) {
            // @step:initialize
            visitOrder.clear(); // @step:initialize
            unordered_set<string> visitedSet; // @step:initialize

            struct StackFrame {
                string nodeId;
                int depth;
            };

            vector<StackFrame> nodeStack = {{startNodeId, 0}}; // @step:push-stack

            while (!nodeStack.empty()) {
                StackFrame frame = nodeStack.back(); // @step:pop-stack
                nodeStack.pop_back(); // @step:pop-stack
                string currentNodeId = frame.nodeId; // @step:pop-stack
                int currentDepth = frame.depth; // @step:pop-stack

                if (visitedSet.count(currentNodeId)) {
                    // @step:backtrack
                    continue; // @step:backtrack
                }

                visitedSet.insert(currentNodeId); // @step:visit
                visitOrder.push_back(currentNodeId); // @step:visit

                if (currentDepth >= depthLimit) {
                    // @step:visit
                    continue; // @step:visit
                }

                auto neighborIt = adjacencyList.find(currentNodeId);
                const vector<string>& neighbors =
                    (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit-edge
                for (int neighborIndex = (int)neighbors.size() - 1; neighborIndex >= 0; neighborIndex--) {
                    // @step:visit-edge
                    const string& neighborId = neighbors[neighborIndex]; // @step:visit-edge
                    if (!visitedSet.count(neighborId)) {
                        // @step:visit-edge
                        nodeStack.push_back({neighborId, currentDepth + 1}); // @step:push-stack
                    }
                }
            }

            bool allVisited = true;
            for (const auto& entry : adjacencyList) {
                if (!visitedSet.count(entry.first)) {
                    allVisited = false;
                    break;
                }
            } // @step:complete
            if (allVisited) break; // @step:complete
        }

        return visitOrder; // @step:complete
    }
};
