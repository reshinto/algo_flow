#include "DfsTopological.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>
#include <set>

bool isValidTopologicalOrder(const vector<string>& order, const unordered_map<string, vector<string>>& adj) {
    unordered_map<string, int> position;
    for (int orderIdx = 0; orderIdx < (int)order.size(); orderIdx++) position[order[orderIdx]] = orderIdx;
    for (auto& entry : adj) {
        int sourcePos = position.count(entry.first) ? position[entry.first] : -1;
        for (auto& target : entry.second) {
            int targetPos = position.count(target) ? position[target] : -1;
            if (sourcePos < 0 || targetPos < 0 || sourcePos >= targetPos) return false;
        }
    }
    return true;
}

int main() {
    // Test 1: default DAG
    {
        unordered_map<string, vector<string>> adj = {
            {"A",{"B","C"}},{"B",{"D"}},{"C",{"D","E"}},
            {"D",{"F"}},{"E",{"F"}},{"F",{}}
        };
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C","D","E","F"});
        assert(result.size() == 6);
        assert(isValidTopologicalOrder(result, adj));
    }

    // Test 2: linear chain
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C","D"});
        assert((result == vector<string>{"A","B","C","D"}));
    }

    // Test 3: single node
    {
        unordered_map<string, vector<string>> adj = {{"A",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A"});
        assert(result.size() == 1 && result[0] == "A");
    }

    // Test 4: diamond DAG
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B","C"}},{"B",{"D"}},{"C",{"D"}},{"D",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C","D"});
        assert(result.size() == 4);
        assert(isValidTopologicalOrder(result, adj));
        assert(result.front() == "A");
        assert(result.back() == "D");
    }

    // Test 5: independent nodes
    {
        unordered_map<string, vector<string>> adj = {{"A",{}},{"B",{}},{"C",{}},{"D",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C","D"});
        assert(result.size() == 4);
    }

    // Test 6: multiple roots
    {
        unordered_map<string, vector<string>> adj = {{"A",{"C"}},{"B",{"C"}},{"C",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C"});
        assert(result.size() == 3);
        assert(isValidTopologicalOrder(result, adj));
    }

    // Test 7: no revisits
    {
        unordered_map<string, vector<string>> adj = {{"A",{"C"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        auto result = DfsTopological::dfsTopologicalSort(adj, {"A","B","C","D"});
        assert(result.size() == 4);
        assert(count(result.begin(), result.end(), "C") == 1);
        assert(isValidTopologicalOrder(result, adj));
    }

    cout << "All tests passed!" << endl;
    return 0;
}
