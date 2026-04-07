#include "CyclicSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Basic unsorted [3,5,2,1,4] -> [1,2,3,4,5]
    assert(cyclicSort({3, 5, 2, 1, 4}) == std::vector<int>({1, 2, 3, 4, 5}));

    // Already sorted [1,2,3,4]
    assert(cyclicSort({1, 2, 3, 4}) == std::vector<int>({1, 2, 3, 4}));

    // Reverse sorted [5,4,3,2,1]
    assert(cyclicSort({5, 4, 3, 2, 1}) == std::vector<int>({1, 2, 3, 4, 5}));

    // Single element
    assert(cyclicSort({1}) == std::vector<int>({1}));

    // Empty array
    assert(cyclicSort({}) == std::vector<int>({}));

    // Two elements swapped
    assert(cyclicSort({2, 1}) == std::vector<int>({1, 2}));

    // Default input [3,5,2,1,4,6]
    assert(cyclicSort({3, 5, 2, 1, 4, 6}) == std::vector<int>({1, 2, 3, 4, 5, 6}));

    // Longer array
    assert(cyclicSort({8, 3, 6, 1, 5, 9, 2, 7, 4, 10}) == std::vector<int>({1, 2, 3, 4, 5, 6, 7, 8, 9, 10}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
