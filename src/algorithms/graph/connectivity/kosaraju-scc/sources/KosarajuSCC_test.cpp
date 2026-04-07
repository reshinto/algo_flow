#include "KosarajuSCC.cpp"
#include <cassert>
#include <iostream>
#include <set>
#include <algorithm>

int main() {
    // Test 1: finds three SCCs in default 8-node graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"C"}}, {"C", {"A", "D"}},
            {"D", {"E"}}, {"E", {"D", "F"}}, {"F", {"G"}},
            {"G", {"H"}}, {"H", {"F"}},
        };
        vector<string> nodeIds = {"A", "B", "C", "D", "E", "F", "G", "H"};
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, nodeIds);
        assert(result.size() == 3);
        vector<set<string>> compSets;
        for (auto& comp : result) compSets.push_back(set<string>(comp.begin(), comp.end()));
        assert(find(compSets.begin(), compSets.end(), set<string>{"A", "B", "C"}) != compSets.end());
        assert(find(compSets.begin(), compSets.end(), set<string>{"D", "E"}) != compSets.end());
        assert(find(compSets.begin(), compSets.end(), set<string>{"F", "G", "H"}) != compSets.end());
    }

    // Test 2: finds single SCC for fully cyclic graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"C"}}, {"C", {"A"}},
        };
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A", "B", "C"});
        assert(result.size() == 1);
        assert(set<string>(result[0].begin(), result[0].end()) == set<string>{"A", "B", "C"});
    }

    // Test 3: returns each node as own SCC for DAG
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"C"}}, {"C", {}},
        };
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A", "B", "C"});
        assert(result.size() == 3);
        for (auto& comp : result) assert(comp.size() == 1);
    }

    // Test 4: handles single node with no edges
    {
        unordered_map<string, vector<string>> adjacencyList = {{"A", {}}};
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A"});
        assert(result.size() == 1);
        assert(result[0] == vector<string>{"A"});
    }

    // Test 5: handles disconnected directed graph with two mutual pairs
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"A"}}, {"C", {"D"}}, {"D", {"C"}},
        };
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A", "B", "C", "D"});
        assert(result.size() == 2);
        vector<set<string>> compSets;
        for (auto& comp : result) compSets.push_back(set<string>(comp.begin(), comp.end()));
        assert(find(compSets.begin(), compSets.end(), set<string>{"A", "B"}) != compSets.end());
        assert(find(compSets.begin(), compSets.end(), set<string>{"C", "D"}) != compSets.end());
    }

    // Test 6: assigns every node to exactly one SCC
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"C"}}, {"C", {"A", "D"}},
            {"D", {"E"}}, {"E", {"D"}},
        };
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A", "B", "C", "D", "E"});
        vector<string> allNodes;
        for (auto& comp : result) for (auto& node : comp) allNodes.push_back(node);
        assert(allNodes.size() == 5);
        assert(set<string>(allNodes.begin(), allNodes.end()).size() == 5);
    }

    // Test 7: produces same SCC groupings for known graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"C"}}, {"C", {"A"}},
            {"D", {"E"}}, {"E", {"D"}},
        };
        auto result = KosarajuSCC::kosarajuSCC(adjacencyList, {"A", "B", "C", "D", "E"});
        assert(result.size() == 2);
        vector<set<string>> compSets;
        for (auto& comp : result) compSets.push_back(set<string>(comp.begin(), comp.end()));
        assert(find(compSets.begin(), compSets.end(), set<string>{"A", "B", "C"}) != compSets.end());
        assert(find(compSets.begin(), compSets.end(), set<string>{"D", "E"}) != compSets.end());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
