#include "../sources/ConnectedComponents.cpp"
#include <cassert>
#include <iostream>
#include <set>
#include <algorithm>

int main() {
    // Test 1: finds three disconnected components
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"A", "C"}}, {"C", {"B"}},
            {"D", {"E"}}, {"E", {"D"}}, {"F", {}},
        };
        auto result = ConnectedComponents::connectedComponents(
            adjacencyList, {"A", "B", "C", "D", "E", "F"});
        assert(result.size() == 3);
        vector<set<string>> compSets;
        for (auto& comp : result) compSets.push_back(set<string>(comp.begin(), comp.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"A", "B", "C"}) != compSets.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"D", "E"}) != compSets.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"F"}) != compSets.end()));
    }

    // Test 2: returns single component for fully connected graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}}, {"B", {"A", "C"}}, {"C", {"A", "B"}},
        };
        auto result = ConnectedComponents::connectedComponents(adjacencyList, {"A", "B", "C"});
        assert(result.size() == 1);
        assert((set<string>(result[0].begin(), result[0].end()) == set<string>{"A", "B", "C"}));
    }

    // Test 3: returns each node as own component when no edges
    {
        unordered_map<string, vector<string>> adjacencyList = {{"A", {}}, {"B", {}}, {"C", {}}};
        auto result = ConnectedComponents::connectedComponents(adjacencyList, {"A", "B", "C"});
        assert(result.size() == 3);
        for (auto& comp : result) assert(comp.size() == 1);
    }

    // Test 4: handles single node graph
    {
        unordered_map<string, vector<string>> adjacencyList = {{"A", {}}};
        auto result = ConnectedComponents::connectedComponents(adjacencyList, {"A"});
        assert(result.size() == 1);
        assert((result[0] == vector<string>{"A"}));
    }

    // Test 5: handles linear chain as single component
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"A", "C"}}, {"C", {"B", "D"}}, {"D", {"C"}},
        };
        auto result = ConnectedComponents::connectedComponents(adjacencyList, {"A", "B", "C", "D"});
        assert(result.size() == 1);
        assert((set<string>(result[0].begin(), result[0].end()) == set<string>{"A", "B", "C", "D"}));
    }

    // Test 6: assigns all nodes to components with no node repeated
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"A"}}, {"C", {"D"}}, {"D", {"C"}}, {"E", {}},
        };
        auto result = ConnectedComponents::connectedComponents(
            adjacencyList, {"A", "B", "C", "D", "E"});
        vector<string> allAssigned;
        for (auto& comp : result) for (auto& node : comp) allAssigned.push_back(node);
        assert(allAssigned.size() == 5);
    }

    // Test 7: correctly identifies 3-component graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}}, {"B", {"A", "C"}}, {"C", {"B"}},
            {"D", {"E"}}, {"E", {"D"}},
            {"F", {"G"}}, {"G", {"F", "H"}}, {"H", {"G"}},
        };
        auto result = ConnectedComponents::connectedComponents(
            adjacencyList, {"A", "B", "C", "D", "E", "F", "G", "H"});
        assert(result.size() == 3);
        vector<set<string>> compSets;
        for (auto& comp : result) compSets.push_back(set<string>(comp.begin(), comp.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"A", "B", "C"}) != compSets.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"D", "E"}) != compSets.end()));
        assert((find(compSets.begin(), compSets.end(), set<string>{"F", "G", "H"}) != compSets.end()));
    }

    cout << "All tests passed!" << endl;
    return 0;
}
