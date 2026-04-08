#include "../sources/AStar.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Test 1: simple weighted graph
    {
        WeightedAdjList adj = {
            {"A", {{"B",4},{"C",2}}},
            {"B", {{"D",5}}},
            {"C", {{"B",1}}},
            {"D", {}},
        };
        unordered_map<string,int> h = {{"A",10},{"B",5},{"C",7},{"D",0}};
        auto result = AStar::aStarSearch(adj, "A", "D", h);
        assert(!result.empty());
        assert(result.front() == "A");
        assert(result.back() == "D");
    }

    // Test 2: start equals target
    {
        WeightedAdjList adj = {{"A",{{"B",3}}},{"B",{}}};
        unordered_map<string,int> h = {{"A",0},{"B",0}};
        auto result = AStar::aStarSearch(adj, "A", "A", h);
        assert(result.size() == 1 && result[0] == "A");
    }

    // Test 3: no path to target
    {
        WeightedAdjList adj = {{"A",{{"B",1}}},{"B",{}},{"C",{}}};
        unordered_map<string,int> h = {{"A",5},{"B",3},{"C",0}};
        auto result = AStar::aStarSearch(adj, "A", "C", h);
        assert(result.empty());
    }

    // Test 4: two-node graph
    {
        WeightedAdjList adj = {{"Start",{{"End",7}}},{"End",{}}};
        unordered_map<string,int> h = {{"Start",7},{"End",0}};
        auto result = AStar::aStarSearch(adj, "Start", "End", h);
        assert(result.size() == 2 && result[0] == "Start" && result[1] == "End");
    }

    // Test 5: 6-node graph
    {
        WeightedAdjList adj = {
            {"A",{{"B",4},{"C",2}}},{"B",{{"D",5}}},
            {"C",{{"B",1},{"E",10}}},{"D",{{"F",2}}},{"E",{{"F",3}}},{"F",{}}
        };
        unordered_map<string,int> h = {{"A",20},{"B",10},{"C",12},{"D",5},{"E",8},{"F",0}};
        auto result = AStar::aStarSearch(adj, "A", "F", h);
        assert(!result.empty() && result.front() == "A" && result.back() == "F");
    }

    // Test 6: heuristic-guided path
    {
        WeightedAdjList adj = {
            {"A",{{"B",1},{"C",3}}},{"B",{{"D",10}}},{"C",{{"D",1}}},{"D",{}}
        };
        unordered_map<string,int> h = {{"A",4},{"B",10},{"C",1},{"D",0}};
        auto result = AStar::aStarSearch(adj, "A", "D", h);
        assert(result.size() == 3 && result[0]=="A" && result[1]=="C" && result[2]=="D");
    }

    cout << "All tests passed!" << endl;
    return 0;
}
