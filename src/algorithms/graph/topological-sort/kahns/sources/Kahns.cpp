// Kahn's Algorithm — topological sort using BFS and in-degree tracking
#include <unordered_map>
#include <vector>
#include <string>
#include <queue>
using namespace std;

class Kahns {
public:
    static vector<string> kahnsTopologicalSort(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> inDegreeMap; // @step:initialize
        for (const string& nodeId : nodeIds) {
            inDegreeMap[nodeId] = 0;
        } // @step:initialize

        static const vector<string> emptyVec;

        for (const string& nodeId : nodeIds) {
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:initialize
            for (const string& neighborId : neighbors) {
                inDegreeMap[neighborId]++;
            } // @step:initialize
        }

        queue<string> nodeQueue; // @step:initialize
        for (const string& nodeId : nodeIds) {
            if (inDegreeMap[nodeId] == 0) {
                nodeQueue.push(nodeId);
            } // @step:enqueue
        }

        vector<string> topologicalOrder;

        while (!nodeQueue.empty()) {
            string currentNodeId = nodeQueue.front(); // @step:dequeue
            nodeQueue.pop(); // @step:dequeue
            topologicalOrder.push_back(currentNodeId); // @step:add-to-order

            auto neighborIt = adjacencyList.find(currentNodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const string& neighborId : neighbors) {
                inDegreeMap[neighborId]--; // @step:visit
                if (inDegreeMap[neighborId] == 0) {
                    nodeQueue.push(neighborId);
                } // @step:enqueue
            }
        }

        return topologicalOrder; // @step:complete
    }
};
