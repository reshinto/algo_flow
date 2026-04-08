#include "../sources/Kahns.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>

bool isValidTopologicalOrderKahns(const vector<string>& order, const unordered_map<string, vector<string>>& adj) {
    unordered_map<string, int> position;
    for (int idx = 0; idx < (int)order.size(); idx++) position[order[idx]] = idx;
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
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C","D","E","F"});
        assert(result.size() == 6);
        assert(isValidTopologicalOrderKahns(result, adj));
    }

    // Test 2: linear chain
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"D"}},{"D",{}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C","D"});
        assert((result == vector<string>{"A","B","C","D"}));
    }

    // Test 3: single node
    {
        unordered_map<string, vector<string>> adj = {{"A",{}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A"});
        assert(result.size() == 1 && result[0] == "A");
    }

    // Test 4: multiple zero in-degree
    {
        unordered_map<string, vector<string>> adj = {{"A",{"C"}},{"B",{"C"}},{"C",{}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C"});
        assert(result.size() == 3);
        assert(isValidTopologicalOrderKahns(result, adj));
    }

    // Test 5: independent nodes
    {
        unordered_map<string, vector<string>> adj = {{"A",{}},{"B",{}},{"C",{}},{"D",{}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C","D"});
        assert(result.size() == 4);
    }

    // Test 6: cycle → empty result
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B"}},{"B",{"C"}},{"C",{"A"}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C"});
        assert(result.empty());
    }

    // Test 7: diamond DAG
    {
        unordered_map<string, vector<string>> adj = {{"A",{"B","C"}},{"B",{"D"}},{"C",{"D"}},{"D",{}}};
        auto result = Kahns::kahnsTopologicalSort(adj, {"A","B","C","D"});
        assert(result.size() == 4);
        assert(isValidTopologicalOrderKahns(result, adj));
        assert(result.front() == "A");
        assert(result.back() == "D");
    }

    cout << "All tests passed!" << endl;
    return 0;
}
