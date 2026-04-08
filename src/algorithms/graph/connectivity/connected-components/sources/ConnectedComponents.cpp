// Connected Components — find all connected components in an undirected graph using BFS
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <queue>
using namespace std;

class ConnectedComponents {
public:
    static vector<vector<string>> connectedComponents(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        vector<vector<string>> components; // @step:initialize
        unordered_set<string> visitedSet; // @step:initialize

        for (const string& startNodeId : nodeIds) {
            if (visitedSet.count(startNodeId)) continue; // @step:initialize

            vector<string> currentComponent; // @step:enqueue
            queue<string> nodeQueue; // @step:enqueue
            nodeQueue.push(startNodeId); // @step:enqueue
            visitedSet.insert(startNodeId); // @step:enqueue

            while (!nodeQueue.empty()) {
                string currentNodeId = nodeQueue.front(); // @step:dequeue
                nodeQueue.pop(); // @step:dequeue
                currentComponent.push_back(currentNodeId); // @step:dequeue,visit

                static const vector<string> emptyVec;
                auto neighborIt = adjacencyList.find(currentNodeId);
                const vector<string>& neighbors =
                    (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;

                for (const string& neighborId : neighbors) {
                    if (!visitedSet.count(neighborId)) {
                        visitedSet.insert(neighborId); // @step:visit-edge
                        nodeQueue.push(neighborId); // @step:visit-edge,enqueue
                    }
                }
            }

            components.push_back(currentComponent); // @step:assign-component
        }

        return components; // @step:complete
    }
};
