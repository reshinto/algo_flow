#include "SlidingWindowMaxDeque.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Default input [1,3,-1,-3,5,3,6,7], k=3 -> [3,3,5,5,6,7]
    {
        auto result = slidingWindowMaxDeque({1, 3, -1, -3, 5, 3, 6, 7}, 3);
        assert((result == std::vector<int>{3, 3, 5, 5, 6, 7}));
    }

    // Empty array
    {
        auto result = slidingWindowMaxDeque({}, 3);
        assert(result.empty());
    }

    // Window exceeds array length
    {
        auto result = slidingWindowMaxDeque({1, 2}, 5);
        assert(result.empty());
    }

    // Window equals array length
    {
        auto result = slidingWindowMaxDeque({3, 1, 4, 1, 5}, 5);
        assert((result == std::vector<int>{5}));
    }

    // Window size 1 (identity)
    {
        auto result = slidingWindowMaxDeque({4, 2, 7, 1, 9}, 1);
        assert((result == std::vector<int>{4, 2, 7, 1, 9}));
    }

    // All equal elements
    {
        auto result = slidingWindowMaxDeque({5, 5, 5, 5}, 2);
        assert((result == std::vector<int>{5, 5, 5}));
    }

    // Decreasing array [9,7,5,3,1], k=3 -> [9,7,5]
    {
        auto result = slidingWindowMaxDeque({9, 7, 5, 3, 1}, 3);
        assert((result == std::vector<int>{9, 7, 5}));
    }

    // Increasing array [1,3,5,7,9], k=3 -> [5,7,9]
    {
        auto result = slidingWindowMaxDeque({1, 3, 5, 7, 9}, 3);
        assert((result == std::vector<int>{5, 7, 9}));
    }

    // Negative numbers [-4,-2,-5,-1,-3], k=2 -> [-2,-2,-1,-1]
    {
        auto result = slidingWindowMaxDeque({-4, -2, -5, -1, -3}, 2);
        assert((result == std::vector<int>{-2, -2, -1, -1}));
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
