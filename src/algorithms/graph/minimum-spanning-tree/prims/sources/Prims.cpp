// Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <string>
#include <tuple>
#include <algorithm>
using namespace std;

struct MstEdge {
    string source;
    string target;
    int weight;
};

using AdjEntry = pair<string, int>;

class Prims {
public:
    static vector<MstEdge> primsAlgorithm(
        const unordered_map<string, vector<AdjEntry>>& adjacencyList,
        const string& startNodeId
    ) {
        vector<MstEdge> mstEdges; // @step:initialize
        unordered_set<string> inMstSet; // @step:initialize
        inMstSet.insert(startNodeId); // @step:initialize

        // Priority queue entries: {weight, sourceNodeId, targetNodeId}
        using PQEntry = tuple<int, string, string>;
        vector<PQEntry> priorityQueue; // @step:initialize

        static const vector<AdjEntry> emptyAdj;
        auto startIt = adjacencyList.find(startNodeId);
        const vector<AdjEntry>& startNeighbors =
            (startIt != adjacencyList.end()) ? startIt->second : emptyAdj;
        for (const auto& entry : startNeighbors) {
            priorityQueue.emplace_back(entry.second, startNodeId, entry.first); // @step:initialize
        }
        sort(priorityQueue.begin(), priorityQueue.end()); // @step:initialize

        while (!priorityQueue.empty()) {
            auto [edgeWeight, sourceId, targetId] = priorityQueue.front(); // @step:dequeue
            priorityQueue.erase(priorityQueue.begin()); // @step:dequeue

            if (inMstSet.count(targetId)) {
                continue; // @step:dequeue
            }

            inMstSet.insert(targetId); // @step:visit
            mstEdges.push_back({sourceId, targetId, edgeWeight}); // @step:add-to-mst

            auto neighborIt = adjacencyList.find(targetId);
            const vector<AdjEntry>& neighbors =
                (neighborIt != adjacencyList.end()) ? neighborIt->second : emptyAdj;
            for (const auto& entry : neighbors) {
                if (!inMstSet.count(entry.first)) {
                    priorityQueue.emplace_back(entry.second, targetId, entry.first); // @step:relax-edge
                    sort(priorityQueue.begin(), priorityQueue.end()); // @step:relax-edge
                }
            }
        }

        return mstEdges; // @step:complete
    }
};
