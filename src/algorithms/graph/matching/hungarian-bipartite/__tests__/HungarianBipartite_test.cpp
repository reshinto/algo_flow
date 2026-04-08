#include "../sources/HungarianBipartite.cpp"
#include <cassert>
#include <iostream>
#include <set>

int main() {
    // Test 1: perfect matching
    {
        unordered_map<string, vector<string>> adj = {
            {"L1", {"R1", "R2"}}, {"L2", {"R2", "R3"}}, {"L3", {"R1", "R3"}},
            {"R1", {"L1", "L3"}}, {"R2", {"L1", "L2"}}, {"R3", {"L2", "L3"}},
        };
        auto result = HungarianBipartite::hungarianMatching(
            adj, {"L1", "L2", "L3"}, {"R1", "R2", "R3"});
        assert(result.size() == 3);
        set<string> rightValues;
        for (auto& entry : result) rightValues.insert(entry.second);
        assert(rightValues.size() == 3);
    }

    // Test 2: partial matching
    {
        unordered_map<string, vector<string>> adj = {
            {"L1", {"R1"}}, {"L2", {"R1"}}, {"R1", {"L1", "L2"}},
        };
        auto result = HungarianBipartite::hungarianMatching(adj, {"L1", "L2"}, {"R1"});
        assert(result.size() == 1);
        assert(result.begin()->second == "R1");
    }

    // Test 3: no edges → empty matching
    {
        unordered_map<string, vector<string>> adj = {
            {"L1", {}}, {"L2", {}}, {"R1", {}}, {"R2", {}},
        };
        auto result = HungarianBipartite::hungarianMatching(adj, {"L1", "L2"}, {"R1", "R2"});
        assert(result.empty());
    }

    // Test 4: single pair
    {
        unordered_map<string, vector<string>> adj = {{"L1", {"R1"}}, {"R1", {"L1"}}};
        auto result = HungarianBipartite::hungarianMatching(adj, {"L1"}, {"R1"});
        assert(result.at("L1") == "R1");
        assert(result.size() == 1);
    }

    // Test 5: augmenting path
    {
        unordered_map<string, vector<string>> adj = {
            {"L1", {"R1", "R2"}}, {"L2", {"R1"}}, {"R1", {"L1", "L2"}}, {"R2", {"L1"}},
        };
        auto result = HungarianBipartite::hungarianMatching(adj, {"L1", "L2"}, {"R1", "R2"});
        assert(result.size() == 2);
        set<string> rightValues;
        for (auto& entry : result) rightValues.insert(entry.second);
        assert(rightValues.size() == 2);
    }

    // Test 6: one-to-one perfect matching
    {
        unordered_map<string, vector<string>> adj = {
            {"L1", {"R1"}}, {"L2", {"R2"}}, {"L3", {"R3"}},
            {"R1", {"L1"}}, {"R2", {"L2"}}, {"R3", {"L3"}},
        };
        auto result = HungarianBipartite::hungarianMatching(
            adj, {"L1", "L2", "L3"}, {"R1", "R2", "R3"});
        assert(result.at("L1") == "R1");
        assert(result.at("L2") == "R2");
        assert(result.at("L3") == "R3");
    }

    // Test 7: empty graph
    {
        auto result = HungarianBipartite::hungarianMatching({}, {}, {});
        assert(result.empty());
    }

    cout << "All tests passed!" << endl;
    return 0;
}
