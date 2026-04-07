#include "BellmanFord.cpp"
#include <cassert>
#include <iostream>
#include <limits>

int main() {
    // Test 1: positive weights
    {
        WeightedAdjList adj = {
            {"A", {{"B",4},{"C",2}}},
            {"B", {{"D",5}}},
            {"C", {{"B",1},{"D",8}}},
            {"D", {}},
        };
        auto distances = BellmanFord::bellmanFord(adj, "A", {"A","B","C","D"});
        assert(distances.at("A") == 0);
        assert(distances.at("C") == 2);
        assert(distances.at("B") == 3);
        assert(distances.at("D") == 8);
    }

    // Test 2: start node is zero
    {
        WeightedAdjList adj = {{"X",{{"Y",3}}},{"Y",{}}};
        auto distances = BellmanFord::bellmanFord(adj, "X", {"X","Y"});
        assert(distances.at("X") == 0);
    }

    // Test 3: unreachable node
    {
        WeightedAdjList adj = {{"A",{{"B",1}}},{"B",{}},{"C",{}}};
        auto distances = BellmanFord::bellmanFord(adj, "A", {"A","B","C"});
        assert(distances.at("C") == numeric_limits<int>::max());
    }

    // Test 4: single node
    {
        WeightedAdjList adj = {{"A",{}}};
        auto distances = BellmanFord::bellmanFord(adj, "A", {"A"});
        assert(distances.at("A") == 0);
    }

    // Test 5: mixed weights
    {
        WeightedAdjList adj = {{"A",{{"B",3}}},{"B",{{"C",-1}}},{"C",{{"D",4}}},{"D",{}}};
        auto distances = BellmanFord::bellmanFord(adj, "A", {"A","B","C","D"});
        assert(distances.at("B") == 3);
        assert(distances.at("C") == 2);
        assert(distances.at("D") == 6);
    }

    // Test 6: negative cycle
    {
        WeightedAdjList adj = {
            {"A",{{"B",1}}},{"B",{{"C",-3}}},{"C",{{"B",1}}},{"D",{}}
        };
        auto distances = BellmanFord::bellmanFord(adj, "A", {"A","B","C","D"});
        assert(distances.at("B") == numeric_limits<int>::min());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
