// Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
#include <unordered_map>
#include <vector>
#include <string>
#include <queue>
#include <algorithm>
#include <functional>
using namespace std;

class BidirectionalBFS {
public:
    static vector<string> bidirectionalBFS(
        const unordered_map<string, vector<string>>& adjacencyList,
        const string& startNodeId,
        const string& targetNodeId
    ) {
        if (startNodeId == targetNodeId) return {startNodeId}; // @step:initialize

        unordered_map<string, string> forwardVisited; // @step:initialize
        unordered_map<string, string> backwardVisited; // @step:initialize
        queue<string> forwardQueue; // @step:initialize
        queue<string> backwardQueue; // @step:initialize
        forwardQueue.push(startNodeId); // @step:initialize
        backwardQueue.push(targetNodeId); // @step:initialize
        forwardVisited[startNodeId] = ""; // @step:initialize
        backwardVisited[targetNodeId] = ""; // @step:initialize

        // Build undirected neighbor lookup by merging both edge directions
        unordered_map<string, vector<string>> undirectedNeighbors;
        for (const auto& entry : adjacencyList) {
            undirectedNeighbors[entry.first];
            for (const string& neighborId : entry.second) {
                undirectedNeighbors[entry.first].push_back(neighborId);
                auto& reverseList = undirectedNeighbors[neighborId];
                if (find(reverseList.begin(), reverseList.end(), entry.first) == reverseList.end()) {
                    reverseList.push_back(entry.first);
                }
            }
        }

        static const vector<string> emptyVec;

        auto reconstructPath = [&](const string& meetingNodeId) -> vector<string> {
            vector<string> forwardPath;
            string currentNode = meetingNodeId;
            while (!currentNode.empty()) {
                forwardPath.insert(forwardPath.begin(), currentNode);
                currentNode = forwardVisited.count(currentNode) ? forwardVisited[currentNode] : "";
            }
            vector<string> backwardPath;
            string backNode = backwardVisited.count(meetingNodeId) ? backwardVisited[meetingNodeId] : "";
            while (!backNode.empty()) {
                backwardPath.push_back(backNode);
                backNode = backwardVisited.count(backNode) ? backwardVisited[backNode] : "";
            }
            forwardPath.insert(forwardPath.end(), backwardPath.begin(), backwardPath.end());
            return forwardPath;
        };

        while (!forwardQueue.empty() || !backwardQueue.empty()) {
            // Expand the forward frontier one level
            if (!forwardQueue.empty()) {
                string currentNodeId = forwardQueue.front(); // @step:dequeue
                forwardQueue.pop(); // @step:dequeue
                auto neighborIt = undirectedNeighbors.find(currentNodeId);
                const vector<string>& forwardNeighbors =
                    (neighborIt != undirectedNeighbors.end()) ? neighborIt->second : emptyVec;
                for (const string& neighborId : forwardNeighbors) {
                    // @step:visit-edge
                    if (!forwardVisited.count(neighborId)) {
                        forwardVisited[neighborId] = currentNodeId; // @step:visit-edge
                        forwardQueue.push(neighborId); // @step:visit-edge,enqueue
                        if (backwardVisited.count(neighborId)) {
                            // @step:complete
                            return reconstructPath(neighborId); // @step:complete
                        }
                    }
                }
            }

            // Expand the backward frontier one level
            if (!backwardQueue.empty()) {
                string currentNodeId = backwardQueue.front(); // @step:dequeue
                backwardQueue.pop(); // @step:dequeue
                auto neighborIt = undirectedNeighbors.find(currentNodeId);
                const vector<string>& backwardNeighbors =
                    (neighborIt != undirectedNeighbors.end()) ? neighborIt->second : emptyVec;
                for (const string& neighborId : backwardNeighbors) {
                    // @step:visit-edge
                    if (!backwardVisited.count(neighborId)) {
                        backwardVisited[neighborId] = currentNodeId; // @step:visit-edge
                        backwardQueue.push(neighborId); // @step:visit-edge,enqueue
                        if (forwardVisited.count(neighborId)) {
                            // @step:complete
                            return reconstructPath(neighborId); // @step:complete
                        }
                    }
                }
            }
        }

        return {}; // @step:complete
    }
};
