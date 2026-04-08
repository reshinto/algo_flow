#include "sources/ArticulationPoints.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // Test 1: finds two articulation points in default 7-node graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}},
            {"B", {"A", "C"}},
            {"C", {"A", "B", "D"}},
            {"D", {"C", "E", "F"}},
            {"E", {"D", "G"}},
            {"F", {"D", "G"}},
            {"G", {"E", "F"}},
        };
        vector<string> nodeIds = {"A", "B", "C", "D", "E", "F", "G"};
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, nodeIds);
        set<string> resultSet(result.begin(), result.end());
        assert(resultSet == set<string>({"C", "D"}));
    }

    // Test 2: returns no articulation points for a triangle
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}},
            {"B", {"A", "C"}},
            {"C", {"A", "B"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A", "B", "C"});
        assert(result.empty());
    }

    // Test 3: finds single articulation point in path graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}},
            {"B", {"A", "C"}},
            {"C", {"B"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A", "B", "C"});
        set<string> resultSet(result.begin(), result.end());
        assert(resultSet == set<string>({"B"}));
    }

    // Test 4: finds multiple articulation points in longer path
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B"}},
            {"B", {"A", "C"}},
            {"C", {"B", "D"}},
            {"D", {"C"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A", "B", "C", "D"});
        set<string> resultSet(result.begin(), result.end());
        assert(resultSet == set<string>({"B", "C"}));
    }

    // Test 5: returns no articulation points for single node
    {
        unordered_map<string, vector<string>> adjacencyList = {{"A", {}}};
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A"});
        assert(result.empty());
    }

    // Test 6: returns no articulation points for fully connected graph
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C", "D"}},
            {"B", {"A", "C", "D"}},
            {"C", {"A", "B", "D"}},
            {"D", {"A", "B", "C"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A", "B", "C", "D"});
        assert(result.empty());
    }

    // Test 7: finds star center as articulation point
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"Center", {"A", "B", "C"}},
            {"A", {"Center"}},
            {"B", {"Center"}},
            {"C", {"Center"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"Center", "A", "B", "C"});
        set<string> resultSet(result.begin(), result.end());
        assert(resultSet == set<string>({"Center"}));
    }

    // Test 8: handles disconnected graphs with no articulation points
    {
        unordered_map<string, vector<string>> adjacencyList = {
            {"A", {"B", "C"}},
            {"B", {"A", "C"}},
            {"C", {"A", "B"}},
            {"D", {"E", "F"}},
            {"E", {"D", "F"}},
            {"F", {"D", "E"}},
        };
        auto result = ArticulationPoints::findArticulationPoints(adjacencyList, {"A", "B", "C", "D", "E", "F"});
        assert(result.empty());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
