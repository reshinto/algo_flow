#include "../sources/FloydWarshall.cpp"
#include <cassert>
#include <iostream>
#include <limits>

int main() {
    // Test 1: 4-node all-pairs
    {
        WeightedAdjList adj = {
            {"A",{{"B",3},{"D",-4}}},{"B",{}},
            {"C",{{"B",-5}}},{"D",{{"C",6}}}
        };
        auto d = FloydWarshall::floydWarshall(adj, {"A","B","C","D"});
        assert(d.at("A").at("A") == 0);
        assert(d.at("A").at("B") == -3);
        assert(d.at("A").at("C") == 2);
        assert(d.at("B").at("B") == 0);
    }

    // Test 2: diagonal is zero
    {
        WeightedAdjList adj = {{"X",{{"Y",2}}},{"Y",{{"Z",3}}},{"Z",{}}};
        auto d = FloydWarshall::floydWarshall(adj, {"X","Y","Z"});
        assert(d.at("X").at("X") == 0);
        assert(d.at("Y").at("Y") == 0);
        assert(d.at("Z").at("Z") == 0);
    }

    // Test 3: unreachable pairs
    {
        WeightedAdjList adj = {{"A",{{"B",1}}},{"B",{}},{"C",{}}};
        auto d = FloydWarshall::floydWarshall(adj, {"A","B","C"});
        assert(d.at("A").at("C") == numeric_limits<int>::max());
        assert(d.at("C").at("A") == numeric_limits<int>::max());
    }

    // Test 4: single node
    {
        WeightedAdjList adj = {{"A",{}}};
        auto d = FloydWarshall::floydWarshall(adj, {"A"});
        assert(d.at("A").at("A") == 0);
    }

    // Test 5: shorter indirect path
    {
        WeightedAdjList adj = {{"A",{{"B",1},{"C",10}}},{"B",{{"C",2}}},{"C",{}}};
        auto d = FloydWarshall::floydWarshall(adj, {"A","B","C"});
        assert(d.at("A").at("C") == 3);
    }

    // Test 6: bidirectional
    {
        WeightedAdjList adj = {{"A",{{"B",4}}},{"B",{{"A",4},{"C",3}}},{"C",{{"B",3}}}};
        auto d = FloydWarshall::floydWarshall(adj, {"A","B","C"});
        assert(d.at("A").at("C") == 7);
        assert(d.at("C").at("A") == 7);
    }

    // Test 7: negative weights
    {
        WeightedAdjList adj = {{"A",{{"B",5}}},{"B",{{"C",-2}}},{"C",{}}};
        auto d = FloydWarshall::floydWarshall(adj, {"A","B","C"});
        assert(d.at("A").at("C") == 3);
        assert(d.at("A").at("B") == 5);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
