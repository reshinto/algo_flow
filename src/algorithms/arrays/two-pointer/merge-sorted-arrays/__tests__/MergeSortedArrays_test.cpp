#include "../sources/MergeSortedArrays.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Basic merge
    assert((mergeSortedArrays({1, 3, 5}, {2, 4, 6}) == std::vector<int>{1, 2, 3, 4, 5, 6}));

    // Empty first array
    assert((mergeSortedArrays({}, {1, 2, 3}) == std::vector<int>{1, 2, 3}));

    // Empty second array
    assert((mergeSortedArrays({1, 2, 3}, {}) == std::vector<int>{1, 2, 3}));

    // Both empty
    assert(mergeSortedArrays({}, {}).empty());

    // Overlapping values
    assert((mergeSortedArrays({1, 2, 4}, {2, 3, 5}) == std::vector<int>{1, 2, 2, 3, 4, 5}));

    // Single elements
    assert((mergeSortedArrays({5}, {3}) == std::vector<int>{3, 5}));

    // Default input
    assert((mergeSortedArrays({1, 3, 5, 7, 9}, {2, 4, 6, 8, 10}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
