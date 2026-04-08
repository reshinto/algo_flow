// Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <functional>
using namespace std;

class KosarajuSCC {
public:
    static vector<vector<string>> kosarajuSCC(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_set<string> visitedSet; // @step:initialize
        vector<string> finishOrder; // @step:initialize

        static const vector<string> emptyVec;

        // First pass: DFS on original graph to collect finish order
        function<void(const string&)> dfsFirstPass = [&](const string& nodeId) {
            visitedSet.insert(nodeId); // @step:visit
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec;
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    dfsFirstPass(neighborId); // @step:visit-edge
                }
            }
            finishOrder.push_back(nodeId); // @step:push-stack
        };

        for (const string& nodeId : nodeIds) {
            if (!visitedSet.count(nodeId)) {
                dfsFirstPass(nodeId); // @step:initialize
            }
        }

        // Build transposed adjacency list
        unordered_map<string, vector<string>> transposedList; // @step:initialize
        for (const string& nodeId : nodeIds) {
            transposedList[nodeId];
        }
        for (const string& sourceId : nodeIds) {
            auto neighborIt = adjacencyList.find(sourceId);
            if (neighborIt != adjacencyList.end()) {
                for (const string& targetId : neighborIt->second) {
                    transposedList[targetId].push_back(sourceId); // @step:initialize
                }
            }
        }

        // Second pass: DFS on transposed graph in reverse finish order
        visitedSet.clear(); // @step:initialize
        vector<vector<string>> components; // @step:initialize

        function<void(const string&, vector<string>&)> dfsSecondPass =
            [&](const string& nodeId, vector<string>& currentComponent) {
            visitedSet.insert(nodeId); // @step:visit
            currentComponent.push_back(nodeId); // @step:visit
            auto neighborIt = transposedList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != transposedList.end()) ? neighborIt->second : emptyVec;
            for (const string& neighborId : neighbors) {
                if (!visitedSet.count(neighborId)) {
                    dfsSecondPass(neighborId, currentComponent); // @step:visit-edge
                }
            }
        };

        for (int index = (int)finishOrder.size() - 1; index >= 0; index--) {
            const string& nodeId = finishOrder[index];
            if (!visitedSet.count(nodeId)) {
                vector<string> currentComponent; // @step:pop-stack
                dfsSecondPass(nodeId, currentComponent); // @step:pop-stack
                components.push_back(currentComponent); // @step:assign-component
            }
        }

        return components; // @step:complete
    }
};
