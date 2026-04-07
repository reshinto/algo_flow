// Greedy Graph Coloring — assign smallest available color to each node in order
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
using namespace std;

class GreedyColoring {
public:
    static unordered_map<string, int> greedyColoring(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& nodeIds
    ) {
        unordered_map<string, int> colorAssignment; // @step:initialize

        static const vector<string> emptyVec;

        for (const string& nodeId : nodeIds) {
            unordered_set<int> neighborColors; // @step:visit-node
            auto neighborIt = adjacencyList.find(nodeId);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit-node
            for (const string& neighborId : neighbors) {
                if (colorAssignment.count(neighborId)) {
                    neighborColors.insert(colorAssignment[neighborId]); // @step:visit-node
                }
            }

            int assignedColor = 0; // @step:assign-color
            while (neighborColors.count(assignedColor)) {
                assignedColor++; // @step:assign-color
            }
            colorAssignment[nodeId] = assignedColor; // @step:assign-color
        }

        return colorAssignment; // @step:complete
    }
};
