#include "PrefixSum.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Single query
    {
        auto [prefixArray, queryResults] = prefixSum({1, 2, 3, 4, 5}, {{1, 3}});
        assert(prefixArray == std::vector<int>({1, 3, 6, 10, 15}));
        assert(queryResults == std::vector<int>({9}));
    }

    // Multiple queries
    {
        auto [prefixArray, queryResults] = prefixSum({2, 4, 1, 3, 5, 2}, {{1, 3}, {0, 4}, {2, 5}});
        assert(queryResults == std::vector<int>({8, 15, 11}));
    }

    // Full range
    {
        auto [prefixArray, queryResults] = prefixSum({3, 1, 4, 1, 5, 9, 2}, {{0, 6}});
        assert(queryResults[0] == 25);
    }

    // Single element range
    {
        auto [prefixArray, queryResults] = prefixSum({10, 20, 30, 40}, {{2, 2}});
        assert(queryResults[0] == 30);
    }

    // Negative numbers
    {
        auto [prefixArray, queryResults] = prefixSum({-2, 5, -1, 3}, {{0, 3}});
        assert(queryResults[0] == 5);
    }

    // Query from index 0
    {
        auto [prefixArray, queryResults] = prefixSum({5, 3, 2, 8}, {{0, 2}});
        assert(queryResults[0] == 10);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
