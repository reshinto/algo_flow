#include "sources/MinimumSubarraySum.cpp"
#include <cassert>
#include <iostream>

int main() {
    // [3,-4,2,-3,-1,7,-5]: min subarray = -6 at [1,4]
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({3, -4, 2, -3, -1, 7, -5});
        assert(minSum == -6);
        assert(startIndex == 1);
        assert(endIndex == 4);
    }

    // All positive: single minimum element
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({3, 1, 4, 1, 5});
        assert(minSum == 1);
    }

    // All negative: full array sum
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({-1, -2, -3});
        assert(minSum == -6);
        assert(startIndex == 0);
        assert(endIndex == 2);
    }

    // Single element
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({-5});
        assert(minSum == -5);
        assert(startIndex == 0);
        assert(endIndex == 0);
    }

    // Empty array
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({});
        assert(minSum == 0);
    }

    // Single negative amid positives
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({5, 5, -20, 5, 5});
        assert(minSum == -20);
        assert(startIndex == 2);
        assert(endIndex == 2);
    }

    // All same negative
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({-3, -3, -3});
        assert(minSum == -9);
        assert(startIndex == 0);
        assert(endIndex == 2);
    }

    // Large negative in middle
    {
        auto [minSum, startIndex, endIndex] = minimumSubarraySum({100, -200, 100});
        assert(minSum == -200);
        assert(startIndex == 1);
        assert(endIndex == 1);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
