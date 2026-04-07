#include "FordFulkerson.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Test 1: simple linear path
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"T", 5}}}, {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 5);
    }

    // Test 2: bottleneck edge
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"A", 10}}}, {"A", {{"T", 3}}}, {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 3);
    }

    // Test 3: two parallel paths
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"A", 5}, {"B", 5}}},
            {"A", {{"T", 5}}}, {"B", {{"T", 5}}}, {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 10);
    }

    // Test 4: 6-node network
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"A", 10}, {"B", 8}}},
            {"A", {{"B", 5}, {"C", 7}}},
            {"B", {{"D", 10}}},
            {"C", {{"D", 3}, {"T", 8}}},
            {"D", {{"T", 10}}},
            {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 17);
    }

    // Test 5: no path to sink
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"A", 10}}}, {"A", {}}, {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 0);
    }

    // Test 6: source equals sink
    {
        unordered_map<string, vector<FlowEdge>> graph = {{"S", {}}};
        assert(FordFulkerson::fordFulkerson(graph, "S", "S") == 0);
    }

    // Test 7: capacity limits
    {
        unordered_map<string, vector<FlowEdge>> graph = {
            {"S", {{"A", 4}, {"B", 2}}},
            {"A", {{"B", 4}, {"T", 2}}},
            {"B", {{"T", 4}}}, {"T", {}},
        };
        assert(FordFulkerson::fordFulkerson(graph, "S", "T") == 6);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
