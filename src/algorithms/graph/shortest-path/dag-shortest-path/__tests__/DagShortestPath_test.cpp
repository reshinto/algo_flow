#include "../sources/DagShortestPath.cpp"
#include <cassert>
#include <iostream>
#include <limits>

int main() {
    // Test 1: simple DAG
    {
        WeightedAdjList adj = {
            {"A",{{"B",2},{"C",6}}},{"B",{{"D",1},{"E",4}}},
            {"C",{{"E",2}}},{"D",{{"F",5}}},{"E",{{"F",1}}},{"F",{}}
        };
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A","B","C","D","E","F"});
        assert(d.at("A") == 0);
        assert(d.at("B") == 2);
        assert(d.at("C") == 6);
        assert(d.at("D") == 3);
        assert(d.at("E") == 6);
        assert(d.at("F") == 7);
    }

    // Test 2: start node zero
    {
        WeightedAdjList adj = {{"Start",{{"End",5}}},{"End",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "Start", {"Start","End"});
        assert(d.at("Start") == 0);
    }

    // Test 3: unreachable nodes
    {
        WeightedAdjList adj = {{"A",{{"B",3}}},{"B",{}},{"C",{{"D",2}}},{"D",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A","B","C","D"});
        assert(d.at("C") == numeric_limits<int>::max());
    }

    // Test 4: single node
    {
        WeightedAdjList adj = {{"A",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A"});
        assert(d.at("A") == 0);
    }

    // Test 5: linear chain
    {
        WeightedAdjList adj = {{"A",{{"B",3}}},{"B",{{"C",4}}},{"C",{{"D",2}}},{"D",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A","B","C","D"});
        assert(d.at("B") == 3);
        assert(d.at("C") == 7);
        assert(d.at("D") == 9);
    }

    // Test 6: negative edge weights
    {
        WeightedAdjList adj = {{"A",{{"B",2},{"C",4}}},{"B",{{"C",-3}}},{"C",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A","B","C"});
        assert(d.at("C") == -1);
    }

    // Test 7: converging paths
    {
        WeightedAdjList adj = {{"A",{{"B",1},{"C",10}}},{"B",{{"D",2}}},{"C",{{"D",1}}},{"D",{}}};
        auto d = DagShortestPath::dagShortestPath(adj, "A", {"A","B","C","D"});
        assert(d.at("D") == 3);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
