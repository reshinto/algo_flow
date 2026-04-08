#include "../sources/SlidingWindowMinSum.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Default input k=3: min window [4,2,1]=7 at index 0
    {
        auto [minSum, windowStartIndex] = minSumSubarray({4, 2, 1, 7, 8, 1, 2, 8, 1, 0}, 3);
        assert(minSum == 7);
        assert(windowStartIndex == 0);
    }

    // Window at start
    {
        auto [minSum, windowStartIndex] = minSumSubarray({1, 2, 3, 8, 9, 10}, 3);
        assert(minSum == 6);
        assert(windowStartIndex == 0);
    }

    // Window at end
    {
        auto [minSum, windowStartIndex] = minSumSubarray({10, 9, 8, 1, 2, 3}, 3);
        assert(minSum == 6);
        assert(windowStartIndex == 3);
    }

    // Empty array
    {
        auto [minSum, windowStartIndex] = minSumSubarray({}, 3);
        assert(minSum == 0);
    }

    // Window size exceeds length
    {
        auto [minSum, windowStartIndex] = minSumSubarray({1, 2}, 5);
        assert(minSum == 0);
    }

    // Negative numbers k=2: min window [-3,-5]=-8 at index 1
    {
        auto [minSum, windowStartIndex] = minSumSubarray({-1, -3, -5, -2, -1, -4}, 2);
        assert(minSum == -8);
        assert(windowStartIndex == 1);
    }

    // Window size 1
    {
        auto [minSum, windowStartIndex] = minSumSubarray({4, 1, 7, 2, 9}, 1);
        assert(minSum == 1);
        assert(windowStartIndex == 1);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
