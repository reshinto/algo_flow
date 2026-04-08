#include "sources/BipartiteCheck.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Test 1: simple two-node graph is bipartite
    {
        auto result = BipartiteCheck::bipartiteCheck({{"A", {"B"}}, {"B", {"A"}}}, {"A", "B"});
        assert(result.isBipartite);
    }

    // Test 2: even cycle is bipartite
    {
        auto result = BipartiteCheck::bipartiteCheck(
            {{"A", {"B", "D"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}}, {"D", {"C", "A"}}},
            {"A", "B", "C", "D"});
        assert(result.isBipartite);
    }

    // Test 3: triangle is not bipartite
    {
        auto result = BipartiteCheck::bipartiteCheck(
            {{"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"A", "B"}}}, {"A", "B", "C"});
        assert(!result.isBipartite);
    }

    // Test 4: default 6-node bipartite graph
    {
        auto result = BipartiteCheck::bipartiteCheck(
            {{"A", {"D", "E"}}, {"B", {"D", "F"}}, {"C", {"E", "F"}},
             {"D", {"A", "B"}}, {"E", {"A", "C"}}, {"F", {"B", "C"}}},
            {"A", "B", "C", "D", "E", "F"});
        assert(result.isBipartite);
        assert(result.coloring.at("A") != result.coloring.at("D"));
        assert(result.coloring.at("A") != result.coloring.at("E"));
    }

    // Test 5: valid 2-coloring
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"C", "D"}}, {"B", {"C", "D"}}, {"C", {"A", "B"}}, {"D", {"A", "B"}},
        };
        auto result = BipartiteCheck::bipartiteCheck(adj, {"A", "B", "C", "D"});
        assert(result.isBipartite);
        for (auto& entry : adj) {
            for (auto& neighbor : entry.second) {
                assert(result.coloring.at(entry.first) != result.coloring.at(neighbor));
            }
        }
    }

    // Test 6: disconnected bipartite graph
    {
        auto result = BipartiteCheck::bipartiteCheck(
            {{"A", {"B"}}, {"B", {"A"}}, {"C", {"D"}}, {"D", {"C"}}}, {"A", "B", "C", "D"});
        assert(result.isBipartite);
    }

    // Test 7: single isolated node
    {
        auto result = BipartiteCheck::bipartiteCheck({{"A", {}}}, {"A"});
        assert(result.isBipartite);
        assert(result.coloring.at("A") == 0);
    }

    // Test 8: 5-cycle is not bipartite
    {
        auto result = BipartiteCheck::bipartiteCheck(
            {{"A", {"B", "E"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}},
             {"D", {"C", "E"}}, {"E", {"D", "A"}}},
            {"A", "B", "C", "D", "E"});
        assert(!result.isBipartite);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
