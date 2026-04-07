// BFS — traverse level-by-level using a FIFO queue
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <queue>
using namespace std;

class BFS {
public:
    static vector<string> breadthFirstSearch(
        const unordered_map<string, vector<string>>& adjacencyList,
        const string& startNodeId
    ) {
        vector<string> visitOrder; // @step:initialize
        unordered_set<string> visitedSet; // @step:initialize
        queue<string> nodeQueue; // @step:initialize
        nodeQueue.push(startNodeId); // @step:initialize
        visitedSet.insert(startNodeId); // @step:initialize

        static const vector<string> emptyVec;

        while (!nodeQueue.empty()) {
            string currentNodeId = nodeQueue.front(); // @step:dequeue
            nodeQueue.pop(); // @step:dequeue
            visitOrder.push_back(currentNodeId); // @step:dequeue,visit
            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            // Mark as visited when enqueuing to avoid duplicate queue entries
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    // @step:visit-edge
                    visitedSet.insert(neighborId); // @step:visit-edge
                    nodeQueue.push(neighborId); // @step:visit-edge,enqueue
                }
            }
        }
        return visitOrder; // @step:complete
    }
};
