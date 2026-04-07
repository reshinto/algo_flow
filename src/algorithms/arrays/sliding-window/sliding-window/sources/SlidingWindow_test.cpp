#include "SlidingWindow.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Basic array [2,1,5,1,3,2], k=3: max window [5,1,3]=9 at index 2
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({2, 1, 5, 1, 3, 2}, 3);
        assert(maxSum == 9);
        assert(windowStartIndex == 2);
    }

    // Window at start
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({10, 9, 8, 1, 2, 3}, 3);
        assert(maxSum == 27);
        assert(windowStartIndex == 0);
    }

    // Window at end
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({1, 2, 3, 8, 9, 10}, 3);
        assert(maxSum == 27);
        assert(windowStartIndex == 3);
    }

    // Empty array
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({}, 3);
        assert(maxSum == 0);
    }

    // Window exceeds length
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({1, 2}, 5);
        assert(maxSum == 0);
    }

    // Negative numbers k=2: max window [-2,-1]=-3 at index 3
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({-1, -3, -5, -2, -1, -4}, 2);
        assert(maxSum == -3);
        assert(windowStartIndex == 3);
    }

    // Default algorithm input k=3: max window [8,4,3]=15 at index 6
    {
        auto [maxSum, windowStartIndex] = maxSumSubarray({2, 1, 5, 1, 3, 2, 8, 4, 3, 5}, 3);
        assert(maxSum == 15);
        assert(windowStartIndex == 6);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
