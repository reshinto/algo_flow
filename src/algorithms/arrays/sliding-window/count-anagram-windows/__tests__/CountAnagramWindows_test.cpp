#include "../sources/CountAnagramWindows.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    // Pattern equals text length -> one window at position 0
    {
        auto [count, positions] = countAnagramWindows({3, 1, 2}, {1, 2, 3});
        assert(count == 1);
        assert(positions == std::vector<int>({0}));
    }

    // No anagram
    {
        auto [count, positions] = countAnagramWindows({1, 1, 1, 1}, {1, 2});
        assert(count == 0);
        assert(positions.empty());
    }

    // Pattern longer than text
    {
        auto [count, positions] = countAnagramWindows({1, 2}, {1, 2, 3});
        assert(count == 0);
    }

    // Empty text
    {
        auto [count, positions] = countAnagramWindows({}, {1, 2});
        assert(count == 0);
    }

    // Basic case - should find position 0
    {
        auto [count, positions] = countAnagramWindows({3, 1, 2, 4, 5}, {1, 2, 3});
        assert(std::find(positions.begin(), positions.end(), 0) != positions.end());
    }

    // Count matches positions length
    {
        auto [count, positions] = countAnagramWindows({1, 2, 3, 1, 2, 1, 3, 2, 1}, {1, 2, 3});
        assert(count == (int)positions.size());
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
