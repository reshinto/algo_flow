#include "sources/Dijkstra.cpp"
#include <cassert>
#include <iostream>
#include <limits>

int main() {
    // Test 1: simple weighted graph
    {
        WeightedAdjList adj = {
            {"A",{{"B",4},{"C",2}}},{"B",{{"D",5}}},
            {"C",{{"B",1},{"D",8}}},{"D",{}}
        };
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("A") == 0);
        assert(d.at("B") == 3);
        assert(d.at("C") == 2);
        assert(d.at("D") == 8);
    }

    // Test 2: start node zero
    {
        WeightedAdjList adj = {{"X",{{"Y",10}}},{"Y",{}}};
        auto d = Dijkstra::dijkstraShortestPath(adj, "X");
        assert(d.at("X") == 0);
    }

    // Test 3: unreachable node
    {
        WeightedAdjList adj = {{"A",{{"B",1}}},{"B",{}},{"C",{}}};
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("C") == numeric_limits<int>::max());
    }

    // Test 4: single node
    {
        WeightedAdjList adj = {{"A",{}}};
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("A") == 0);
    }

    // Test 5: multiple hops
    {
        WeightedAdjList adj = {
            {"A",{{"B",4},{"C",2}}},{"B",{{"D",5}}},
            {"C",{{"B",1},{"D",8},{"E",10}}},{"D",{{"F",2}}},{"E",{{"F",3}}},{"F",{}}
        };
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("C") == 2);
        assert(d.at("B") == 3);
        assert(d.at("D") == 8);
        assert(d.at("F") == 10);
        assert(d.at("E") == 12);
    }

    // Test 6: lower-weight indirect path
    {
        WeightedAdjList adj = {
            {"A",{{"B",10},{"C",1}}},{"B",{{"D",1}}},
            {"C",{{"B",1},{"D",5}}},{"D",{}}
        };
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("D") == 3);
    }

    // Test 7: linear chain
    {
        WeightedAdjList adj = {{"A",{{"B",2}}},{"B",{{"C",3}}},{"C",{{"D",4}}},{"D",{}}};
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("B") == 2);
        assert(d.at("C") == 5);
        assert(d.at("D") == 9);
    }

    // Test 8: equal weight edges
    {
        WeightedAdjList adj = {
            {"A",{{"B",1},{"C",1}}},{"B",{{"D",1}}},{"C",{{"D",1}}},{"D",{}}
        };
        auto d = Dijkstra::dijkstraShortestPath(adj, "A");
        assert(d.at("D") == 2);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
