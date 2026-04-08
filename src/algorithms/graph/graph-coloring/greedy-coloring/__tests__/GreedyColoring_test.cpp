#include "../sources/GreedyColoring.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // Test 1: single node gets color 0
    {
        auto result = GreedyColoring::greedyColoring({{"A", {}}}, {"A"});
        assert(result.at("A") == 0);
    }

    // Test 2: two connected nodes get different colors
    {
        auto result = GreedyColoring::greedyColoring({{"A", {"B"}}, {"B", {"A"}}}, {"A", "B"});
        assert(result.at("A") != result.at("B"));
    }

    // Test 3: triangle gets 3 distinct colors
    {
        auto result = GreedyColoring::greedyColoring(
            {{"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"A", "B"}}}, {"A", "B", "C"});
        assert(result.at("A") != result.at("B"));
        assert(result.at("A") != result.at("C"));
        assert(result.at("B") != result.at("C"));
    }

    // Test 4: bipartite graph uses at most 2 colors
    {
        auto result = GreedyColoring::greedyColoring(
            {{"A", {"B", "D"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}}, {"D", {"C", "A"}}},
            {"A", "B", "C", "D"});
        set<int> usedColors;
        for (auto& entry : result) usedColors.insert(entry.second);
        assert(usedColors.size() <= 2);
    }

    // Test 5: assigns smallest available color
    {
        auto result = GreedyColoring::greedyColoring(
            {{"A", {"B"}}, {"B", {"A", "C"}}, {"C", {"B"}}}, {"A", "B", "C"});
        assert(result.at("A") == 0);
        assert(result.at("B") == 1);
        assert(result.at("C") == 0);
    }

    // Test 6: valid coloring — no adjacent nodes share a color
    {
        unordered_map<string, vector<string>> adj = {
            {"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"A", "B", "D"}},
            {"D", {"C", "E", "F"}}, {"E", {"D", "F"}}, {"F", {"D", "E"}},
        };
        auto result = GreedyColoring::greedyColoring(adj, {"A", "B", "C", "D", "E", "F"});
        for (auto& entry : adj) {
            for (auto& neighbor : entry.second) {
                assert(result.at(entry.first) != result.at(neighbor));
            }
        }
    }

    // Test 7: isolated nodes all get color 0
    {
        auto result = GreedyColoring::greedyColoring(
            {{"A", {}}, {"B", {}}, {"C", {}}}, {"A", "B", "C"});
        assert(result.at("A") == 0);
        assert(result.at("B") == 0);
        assert(result.at("C") == 0);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
