#include "sources/Hierholzers.cpp"
#include <cassert>
#include <iostream>
#include <numeric>
#include <set>

bool isValidCircuit(const vector<string>& circuit,
                    const unordered_map<string, vector<string>>& adjacencyList,
                    const string& startNodeId) {
    if (circuit.empty()) return false;
    if (circuit.front() != startNodeId) return false;
    if (circuit.back() != startNodeId) return false;
    int totalEdges = 0;
    for (auto& entry : adjacencyList) totalEdges += (int)entry.second.size();
    totalEdges /= 2;
    return (int)circuit.size() - 1 == totalEdges;
}

int main() {
    // Test 1: triangle
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        assert(circuit.front() == "A");
        assert(circuit.back() == "A");
        assert(isValidCircuit(circuit, adj, "A"));
    }

    // Test 2: default 5-node graph
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C", "D", "E"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}},
            {"D", {"A", "E"}}, {"E", {"D", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        assert(circuit.front() == "A");
        assert(circuit.back() == "A");
        assert(isValidCircuit(circuit, adj, "A"));
    }

    // Test 3: single node no edges
    {
        unordered_map<string, vector<string>> adj = {{"A", {}}};
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        assert(circuit == vector<string>{"A"});
    }

    // Test 4: square
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "D"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}}, {"D", {"C", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        assert(circuit.front() == "A");
        assert(circuit.back() == "A");
        assert(isValidCircuit(circuit, adj, "A"));
    }

    // Test 5: two triangles sharing a node
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C", "D", "E"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}},
            {"D", {"A", "E"}}, {"E", {"D", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        assert(circuit.front() == "A");
        assert(circuit.back() == "A");
        assert(circuit.size() == 7);
    }

    // Test 6: starting from non-hub node
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "B");
        assert(circuit.front() == "B");
        assert(circuit.back() == "B");
        assert(circuit.size() == 4);
    }

    // Test 7: only valid nodes in circuit
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"B", "A"}},
        };
        auto circuit = Hierholzers::hierholzersAlgorithm(adj, "A");
        set<string> validNodes = {"A", "B", "C"};
        for (auto& nodeId : circuit) assert(validNodes.count(nodeId) > 0);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
