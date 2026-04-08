// Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
#include <unordered_map>
#include <vector>
#include <string>
#include <stack>
#include <algorithm>
#include <functional>
using namespace std;

class TarjanSCC {
public:
    static vector<vector<string>> tarjanSCC(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> discoveryTime; // @step:initialize
        unordered_map<string, int> lowLink; // @step:initialize
        unordered_map<string, bool> onStack; // @step:initialize
        stack<string> nodeStack; // @step:initialize
        vector<vector<string>> components; // @step:initialize
        int timer = 0; // @step:initialize

        static const vector<string> emptyVec;

        function<void(const string&)> dfs = [&](const string& nodeId) {
            discoveryTime[nodeId] = timer; // @step:visit
            lowLink[nodeId] = timer; // @step:visit
            timer++; // @step:visit
            nodeStack.push(nodeId); // @step:push-stack
            onStack[nodeId] = true; // @step:push-stack

            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;

            for (const string& neighborId : neighbors) {
                if (discoveryTime.find(neighborId) == discoveryTime.end()) {
                    dfs(neighborId); // @step:visit-edge
                    lowLink[nodeId] = min(lowLink[nodeId], lowLink[neighborId]); // @step:visit-edge
                } else if (onStack.count(neighborId) && onStack[neighborId]) {
                    lowLink[nodeId] = min(lowLink[nodeId], discoveryTime[neighborId]); // @step:visit-edge
                }
            }

            if (lowLink[nodeId] == discoveryTime[nodeId]) {
                vector<string> component; // @step:pop-stack
                string poppedNodeId;
                do {
                    poppedNodeId = nodeStack.top(); // @step:pop-stack
                    nodeStack.pop(); // @step:pop-stack
                    onStack[poppedNodeId] = false; // @step:pop-stack
                    component.push_back(poppedNodeId); // @step:pop-stack
                } while (poppedNodeId != nodeId);
                components.push_back(component); // @step:assign-component
            }
        };

        for (const string& nodeId : nodeIds) {
            if (discoveryTime.find(nodeId) == discoveryTime.end()) {
                dfs(nodeId); // @step:initialize
            }
        }

        return components; // @step:complete
    }
};
