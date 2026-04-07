// DFS — traverse depth-first using a LIFO stack
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <stack>
using namespace std;

class DFS {
public:
    static vector<string> depthFirstSearch(
        const unordered_map<string, vector<string>>& adjacencyList,
        const string& startNodeId
    ) {
        vector<string> visitOrder; // @step:initialize
        unordered_set<string> visitedSet; // @step:initialize
        stack<string> nodeStack; // @step:initialize,push-stack
        nodeStack.push(startNodeId); // @step:initialize,push-stack

        static const vector<string> emptyVec;

        while (!nodeStack.empty()) {
            string currentNodeId = nodeStack.top(); // @step:pop-stack
            nodeStack.pop(); // @step:pop-stack
            if (visitedSet.count(currentNodeId)) {
                continue; // @step:pop-stack
            }
            visitedSet.insert(currentNodeId); // @step:visit
            visitOrder.push_back(currentNodeId); // @step:visit

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    // @step:visit-edge
                    nodeStack.push(neighborId); // @step:visit-edge,push-stack
                }
            }
        }
        return visitOrder; // @step:complete
    }
};
