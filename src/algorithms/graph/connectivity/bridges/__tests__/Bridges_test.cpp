#include "../sources/Bridges.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // Test 1: finds two bridges in default 7-node graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}},
            {"B", {"A", "C"}},
            {"C", {"B", "A", "D"}},
            {"D", {"C", "E"}},
            {"E", {"D", "F", "G"}},
            {"F", {"E", "G"}},
            {"G", {"F", "E"}},
        };
        vector<string> nodeIds = {"A", "B", "C", "D", "E", "F", "G"};
        Bridges b;
        auto result = b.findBridges(adjacencyList, nodeIds);
        assert(result.size() == 2);
        vector<set<string>> bridgeSets;
        for (auto& br : result) bridgeSets.push_back({br.first, br.second});
        assert((find(bridgeSets.begin(), bridgeSets.end(), set<string>{"C", "D"}) != bridgeSets.end()));
        assert((find(bridgeSets.begin(), bridgeSets.end(), set<string>{"D", "E"}) != bridgeSets.end()));
    }

    // Test 2: returns no bridges for cycle graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}},
            {"B", {"A", "C"}},
            {"C", {"A", "B"}},
        };
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A", "B", "C"});
        assert(result.empty());
    }

    // Test 3: finds single bridge in two-node graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}},
            {"B", {"A"}},
        };
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A", "B"});
        assert(result.size() == 1);
        assert(((set<string>{result[0].first, result[0].second}) == set<string>{"A", "B"}));
    }

    // Test 4: finds all edges as bridges in path graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}},
            {"B", {"A", "C"}},
            {"C", {"B", "D"}},
            {"D", {"C"}},
        };
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A", "B", "C", "D"});
        assert(result.size() == 3);
    }

    // Test 5: returns empty for fully connected graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C", "D"}},
            {"B", {"A", "C", "D"}},
            {"C", {"A", "B", "D"}},
            {"D", {"A", "B", "C"}},
        };
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A", "B", "C", "D"});
        assert(result.empty());
    }

    // Test 6: handles disconnected graph with bridges in each component
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}},
            {"B", {"A"}},
            {"C", {"D"}},
            {"D", {"C"}},
        };
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A", "B", "C", "D"});
        assert(result.size() == 2);
        vector<set<string>> bridgeSets;
        for (auto& br : result) bridgeSets.push_back({br.first, br.second});
        assert((find(bridgeSets.begin(), bridgeSets.end(), set<string>{"A", "B"}) != bridgeSets.end()));
        assert((find(bridgeSets.begin(), bridgeSets.end(), set<string>{"C", "D"}) != bridgeSets.end()));
    }

    // Test 7: returns no bridges for single isolated node
    {
        unordered_map<string, vector<string>> adjacencyList = {{"A", {}}};
        Bridges b;
        auto result = b.findBridges(adjacencyList, {"A"});
        assert(result.empty());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
