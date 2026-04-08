#include "sources/SubarrayProductLessThanK.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Default input [10,5,2,6,1,3], threshold=100: count=16
    assert(subarrayProductLessThanK({10, 5, 2, 6, 1, 3}, 100) == 16);

    // Threshold 0 -> no subarrays qualify
    assert(subarrayProductLessThanK({1, 2, 3}, 0) == 0);

    // Threshold 1 -> no subarrays qualify
    assert(subarrayProductLessThanK({1, 2, 3}, 1) == 0);

    // Empty array
    assert(subarrayProductLessThanK({}, 100) == 0);

    // [1,2,3,4], threshold=5: 5 subarrays qualify
    assert(subarrayProductLessThanK({1, 2, 3, 4}, 5) == 5);

    // All ones [1,1,1], threshold=2: 6 subarrays
    assert(subarrayProductLessThanK({1, 1, 1}, 2) == 6);

    // Single element below threshold
    assert(subarrayProductLessThanK({5}, 10) == 1);

    // Single element at threshold (not strictly less)
    assert(subarrayProductLessThanK({10}, 10) == 0);

    // Large threshold: all 6 subarrays of [1,2,3] qualify
    assert(subarrayProductLessThanK({1, 2, 3}, 1000) == 6);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
