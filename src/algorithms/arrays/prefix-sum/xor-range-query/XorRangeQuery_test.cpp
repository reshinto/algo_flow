#include "sources/XorRangeQuery.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    {
        auto [prefixXor, queryResults] = xorRangeQuery({3, 5, 2, 7, 1, 4}, {{0, 2}});
        assert(queryResults[0] == 4);
    }
    {
        auto [prefixXor, queryResults] = xorRangeQuery({3, 5, 2, 7, 1, 4}, {{0, 2}, {1, 4}, {2, 5}});
        assert(queryResults == std::vector<int>({4, 1, 0}));
    }
    {
        auto [prefixXor, queryResults] = xorRangeQuery({3, 5, 2, 7, 1, 4}, {{0, 5}});
        assert(prefixXor == std::vector<int>({3, 6, 4, 3, 2, 6}));
    }
    {
        auto [prefixXor, queryResults] = xorRangeQuery({1, 2, 3, 4}, {{0, 3}});
        assert(queryResults[0] == 4);
    }
    {
        auto [prefixXor, queryResults] = xorRangeQuery({10, 20, 30, 40}, {{2, 2}});
        assert(queryResults[0] == 30);
    }
    {
        auto [prefixXor, queryResults] = xorRangeQuery({0, 0, 0, 0}, {{0, 3}});
        assert(queryResults[0] == 0);
        assert(prefixXor == std::vector<int>({0, 0, 0, 0}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
