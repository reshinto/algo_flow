#include "sources/BidirectionalBFS.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Test 1: linear graph
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        auto result = BidirectionalBFS::bidirectionalBFS(adj, "A", "D");
        assert((result == vector<string>{"A","B","C","D"}));
    }

    // Test 2: branching graph
    {
        unordered_map<string, vector<string>> adj = {
            {"A",{"B","C"}},{"B",{"D"}},{"C",{"E"}},{"D",{"F"}},{"E",{"F"}},{"F",{}}
        };
        auto result = BidirectionalBFS::bidirectionalBFS(adj, "A", "F");
        assert(!result.empty() && result.front() == "A" && result.back() == "F");
    }

    // Test 3: no path
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}},{"C",{"D"}},{"D",{}}};
        assert(BidirectionalBFS::bidirectionalBFS(adj, "A", "C").empty());
    }

    // Test 4: start equals target
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}}};
        auto result = BidirectionalBFS::bidirectionalBFS(adj, "A", "A");
        assert(result.size() == 1 && result[0] == "A");
    }

    // Test 5: shortest path
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C","E"}},{"C",{"D"}},{"D",{"E"}},{"E",{}}};
        auto result = BidirectionalBFS::bidirectionalBFS(adj, "A", "E");
        assert(!result.empty() && result.size() == 3 && result.front() == "A" && result.back() == "E");
    }

    // Test 6: adjacent nodes
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}}};
        assert((BidirectionalBFS::bidirectionalBFS(adj, "A", "B") == vector<string>{"A","B"}));
    }

    // Test 7: backward frontier (undirected)
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{}}};
        auto result = BidirectionalBFS::bidirectionalBFS(adj, "B", "A");
        assert(!result.empty() && result.size() == 2);
    }

    // Test 8: isolated start node
    {
        unordered_map<string, vector<string>> adj = {{"A",{}},{"B",{"C"}},{"C",{}}};
        assert(BidirectionalBFS::bidirectionalBFS(adj, "A", "C").empty());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
