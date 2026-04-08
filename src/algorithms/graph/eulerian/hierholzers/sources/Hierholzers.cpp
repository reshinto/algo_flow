// Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
#include <unordered_map>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Hierholzers {
public:
    static vector<string> hierholzersAlgorithm(
        const unordered_map<string, vector<string>>& adjacencyList,
        const string& startNodeId
    ) {
        // Build a mutable copy of the adjacency list so edges can be removed as used
        unordered_map<string, vector<string>> remainingEdges; // @step:initialize
        for (const auto& entry : adjacencyList) {
            remainingEdges[entry.first] = entry.second; // @step:initialize
        }

        vector<string> circuit; // @step:initialize
        vector<string> nodeStack = {startNodeId}; // @step:initialize,push-stack

        while (!nodeStack.empty()) {
            const string& currentNodeId = nodeStack.back(); // @step:pop-stack
            vector<string>& currentNeighbors = remainingEdges[currentNodeId];

            if (!currentNeighbors.empty()) {
                string nextNodeId = currentNeighbors.front(); // @step:use-edge
                currentNeighbors.erase(currentNeighbors.begin()); // @step:use-edge
                // For undirected graphs, remove the reverse edge as well
                vector<string>& reverseNeighbors = remainingEdges[nextNodeId];
                auto reverseIt = find(reverseNeighbors.begin(), reverseNeighbors.end(), currentNodeId);
                if (reverseIt != reverseNeighbors.end()) {
                    reverseNeighbors.erase(reverseIt); // @step:use-edge
                }
                nodeStack.push_back(nextNodeId); // @step:push-stack
            } else {
                // No unused edges from currentNodeId — add it to the circuit
                nodeStack.pop_back(); // @step:pop-stack
                circuit.insert(circuit.begin(), currentNodeId); // @step:visit
            }
        }

        return circuit; // @step:complete
    }
};
