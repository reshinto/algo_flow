#include "../sources/DFS.cpp"
#include <algorithm>
#include <cassert>
#include <iostream>

int main() {
    // Test 1: linear graph
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        assert((DFS::depthFirstSearch(adj, "A") == vector<string>{"A","B","C","D"}));
    }

    // Test 2: disconnected graph
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}},{"C",{"D"}},{"D",{}}};
        auto result = DFS::depthFirstSearch(adj, "A");
        assert((result == vector<string>{"A","B"}));
        assert(find(result.begin(), result.end(), "C") == result.end());
    }

    // Test 3: single node
    {
        unordered_map<string, vector<string>> adj = {{"A",{}}};
        assert((DFS::depthFirstSearch(adj, "A") == vector<string>{"A"}));
    }

    // Test 4: cyclic graph — no duplicates
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"A"}}};
        auto result = DFS::depthFirstSearch(adj, "A");
        assert(result.size() == 3);
    }

    // Test 5: fully connected
    {
        unordered_map<string, vector<string>> adj = {
            {"A",{"B","C","D"}},{"B",{"A","C","D"}},
            {"C",{"A","B","D"}},{"D",{"A","B","C"}}
        };
        auto result = DFS::depthFirstSearch(adj, "A");
        assert(result.size() == 4 && result[0] == "A");
    }

    // Test 6: node missing from adjacency list
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}}};
        assert((DFS::depthFirstSearch(adj, "A") == vector<string>{"A","B"}));
    }

    // Test 7: diamond graph — each node once
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B","C"}},{"B",{"D"}},{"C",{"D"}},{"D",{}}};
        auto result = DFS::depthFirstSearch(adj, "A");
        assert(result.size() == 4 && result[0] == "A");
    }

    cout << "All tests passed!" << endl;
    return 0;
}
