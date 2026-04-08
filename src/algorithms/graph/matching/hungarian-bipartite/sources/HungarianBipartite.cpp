// Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <functional>
using namespace std;

class HungarianBipartite {
public:
    static unordered_map<string, string> hungarianMatching(
        const unordered_map<string, vector<string>>& adjacencyList,
        const vector<string>& leftNodes,
        const vector<string>& rightNodes
    ) {
        unordered_map<string, string> matchLeft; // @step:initialize
        unordered_map<string, string> matchRight; // @step:initialize

        static const vector<string> emptyVec;

        function<bool(const string&, unordered_set<string>&)> tryAugment =
            [&](const string& leftNode, unordered_set<string>& visitedRight) -> bool {
            auto neighborIt = adjacencyList.find(leftNode);
            const vector<string>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyVec; // @step:visit-edge
            for (const string& rightNode : neighbors) {
                // @step:visit-edge
                if (visitedRight.count(rightNode)) continue; // @step:visit-edge
                visitedRight.insert(rightNode); // @step:visit-edge

                auto ownerIt = matchRight.find(rightNode); // @step:visit-edge
                if (ownerIt == matchRight.end() ||
                    tryAugment(ownerIt->second, visitedRight)) {
                    matchLeft[leftNode] = rightNode; // @step:match-edge
                    matchRight[rightNode] = leftNode; // @step:match-edge
                    return true; // @step:match-edge
                }
            }
            return false; // @step:visit-edge
        };

        for (const string& leftNode : leftNodes) {
            // @step:initialize
            unordered_set<string> visitedRight; // @step:initialize
            tryAugment(leftNode, visitedRight); // @step:visit
        }

        return matchLeft; // @step:complete
    }
};
