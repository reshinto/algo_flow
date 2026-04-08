#include "sources/SingleNumber.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Basic array [4,1,2,1,2] -> 4
    assert(singleNumber({4, 1, 2, 1, 2}) == 4);

    // Single element [42] -> 42
    assert(singleNumber({42}) == 42);

    // Unique at end [1,1,2,2,3] -> 3
    assert(singleNumber({1, 1, 2, 2, 3}) == 3);

    // Unique at start [5,3,3,7,7] -> 5
    assert(singleNumber({5, 3, 3, 7, 7}) == 5);

    // Empty array -> 0
    assert(singleNumber({}) == 0);

    // Negative numbers [-1,2,-1] -> 2
    assert(singleNumber({-1, 2, -1}) == 2);

    // Larger array with unique at position 5
    assert(singleNumber({1, 2, 3, 4, 5, 99, 5, 4, 3, 2, 1}) == 99);

    // Unique element of value 0
    assert(singleNumber({1, 2, 1, 2, 0}) == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
