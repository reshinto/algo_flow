#include "Prims.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    auto totalWeight = [](const vector<Prims::MstEdge>& edges) {
        int sum = 0;
        for (auto& e : edges) sum += e.weight;
        return sum;
    };

    // Test 1: 6-node MST
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",4},{"C",2}}},
            {"B", {{"A",4},{"C",1},{"D",5}}},
            {"C", {{"A",2},{"B",1},{"D",8},{"E",10}}},
            {"D", {{"B",5},{"C",8},{"E",2},{"F",6}}},
            {"E", {{"C",10},{"D",2},{"F",3}}},
            {"F", {{"D",6},{"E",3}}},
        };
        auto result = Prims::primsAlgorithm(adj, "A");
        assert(result.size() == 5);
        assert(totalWeight(result) == 13);
    }

    // Test 2: V-1 edges
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",3},{"C",1}}},
            {"B", {{"A",3},{"C",2}}},
            {"C", {{"A",1},{"B",2}}},
        };
        auto result = Prims::primsAlgorithm(adj, "A");
        assert(result.size() == 2);
    }

    // Test 3: minimum weight selection
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",10},{"C",1}}},
            {"B", {{"A",10},{"C",2}}},
            {"C", {{"A",1},{"B",2}}},
        };
        auto result = Prims::primsAlgorithm(adj, "A");
        assert(result.size() == 2);
        assert(totalWeight(result) == 3);
    }

    // Test 4: no revisits
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",1},{"C",2}}},
            {"B", {{"A",1},{"C",3}}},
            {"C", {{"A",2},{"B",3}}},
        };
        auto result = Prims::primsAlgorithm(adj, "A");
        set<string> targets;
        for (auto& e : result) targets.insert(e.target);
        assert(targets.size() == result.size());
    }

    // Test 5: linear chain
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",5}}},
            {"B", {{"A",5},{"C",3}}},
            {"C", {{"B",3},{"D",7}}},
            {"D", {{"C",7}}},
        };
        auto result = Prims::primsAlgorithm(adj, "A");
        assert(result.size() == 3);
        assert(totalWeight(result) == 15);
    }

    // Test 6: non-first start node gives same weight
    {
        unordered_map<string, vector<AdjEntry>> adj = {
            {"A", {{"B",1},{"C",4}}},
            {"B", {{"A",1},{"C",2}}},
            {"C", {{"A",4},{"B",2}}},
        };
        auto fromB = Prims::primsAlgorithm(adj, "B");
        auto fromA = Prims::primsAlgorithm(adj, "A");
        assert(totalWeight(fromB) == totalWeight(fromA));
    }

    // Test 7: two-node graph
    {
        unordered_map<string, vector<AdjEntry>> adj = {{"A",{{"B",9}}},{"B",{{"A",9}}}};
        auto result = Prims::primsAlgorithm(adj, "A");
        assert(result.size() == 1);
        assert(result[0].weight == 9);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
