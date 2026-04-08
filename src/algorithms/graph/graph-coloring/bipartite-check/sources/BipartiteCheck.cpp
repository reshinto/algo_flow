// Bipartite Check — 2-coloring via BFS; conflict means not bipartite
#include <unordered_map>
#include <vector>
#include <string>
#include <queue>
using namespace std;

struct BipartiteResult {
    bool isBipartite;
    unordered_map<string, int> coloring;
};

class BipartiteCheck {
public:
    static BipartiteResult bipartiteCheck(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> coloring; // @step:initialize

        static const vector<string> emptyVec;

        for (const string& startNodeId : nodeIds) {
            if (coloring.count(startNodeId)) continue; // @step:initialize

            coloring[startNodeId] = 0; // @step:enqueue
            queue<string> nodeQueue; // @step:enqueue
            nodeQueue.push(startNodeId); // @step:enqueue

            while (!nodeQueue.empty()) {
                string currentId = nodeQueue.front(); // @step:dequeue
                nodeQueue.pop(); // @step:dequeue
                int currentColor = coloring[currentId]; // @step:visit-node

                auto neighborIt = adjacencyList.find(currentId);
                const vector<string>& neighbors =
                    (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit-node

                for (const string& neighborId : neighbors) {
                    if (!coloring.count(neighborId)) {
                        coloring[neighborId] = 1 - currentColor; // @step:assign-color
                        nodeQueue.push(neighborId); // @step:assign-color
                    } else if (coloring[neighborId] == currentColor) {
                        return {false, coloring}; // @step:check-conflict
                    }
                }
            }
        }

        return {true, coloring}; // @step:complete
    }
};
