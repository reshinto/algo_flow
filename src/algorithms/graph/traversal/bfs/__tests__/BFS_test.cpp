#include "../sources/BFS.cpp"
#include <algorithm>
#include <cassert>
#include <iostream>

int main() {
    // Test 1: linear graph
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        assert((BFS::breadthFirstSearch(adj, "A") == vector<string>{"A","B","C","D"}));
    }

    // Test 2: tree level by level
    {
        unordered_map<string, vector<string>> adj = {
            {"A",{"B","C"}},{"B",{"D","E"}},{"C",{"F"}},{"D",{}},{"E",{}},{"F",{}}
        };
        assert((BFS::breadthFirstSearch(adj, "A") == vector<string>{"A","B","C","D","E","F"}));
    }

    // Test 3: disconnected graph
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}},{"C",{"D"}},{"D",{}}};
        auto result = BFS::breadthFirstSearch(adj, "A");
        assert((result == vector<string>{"A","B"}));
        assert(find(result.begin(), result.end(), "C") == result.end());
    }

    // Test 4: single node
    {
        unordered_map<string, vector<string>> adj = {{"A",{}}};
        assert((BFS::breadthFirstSearch(adj, "A") == vector<string>{"A"}));
    }

    // Test 5: cyclic graph — no duplicates
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"A"}}};
        assert((BFS::breadthFirstSearch(adj, "A") == vector<string>{"A","B","C"}));
    }

    // Test 6: neighbor order preserved
    {
        unordered_map<string, vector<string>> adj = {{"A",{"C","B"}},{"B",{}},{"C",{}}};
        assert((BFS::breadthFirstSearch(adj, "A") == vector<string>{"A","C","B"}));
    }

    // Test 7: node missing from adjacency list
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}}};
        auto result = BFS::breadthFirstSearch(adj, "A");
        assert((result == vector<string>{"A","B"}));
    }

    // Test 8: fully connected graph
    {
        unordered_map<string, vector<string>> adj = {
            {"A",{"B","C","D"}},{"B",{"A","C","D"}},
            {"C",{"A","B","D"}},{"D",{"A","B","C"}}
        };
        auto result = BFS::breadthFirstSearch(adj, "A");
        assert(result.size() == 4);
        assert(result[0] == "A");
    }

    cout << "All tests passed!" << endl;
    return 0;
}
