#include "../sources/CountingSort.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Basic unsorted array
    assert((countingSort({3, 1, 4, 1, 5, 9, 2, 6}) == std::vector<int>{1, 1, 2, 3, 4, 5, 6, 9}));

    // Already sorted
    assert((countingSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // Reverse sorted
    assert((countingSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));

    // All same elements
    assert((countingSort({3, 3, 3, 3}) == std::vector<int>{3, 3, 3, 3}));

    // Single element
    assert((countingSort({7}) == std::vector<int>{7}));

    // Empty array
    assert(countingSort({}).empty());

    // Duplicates
    assert((countingSort({4, 2, 2, 8, 3, 3, 1}) == std::vector<int>{1, 2, 2, 3, 3, 4, 8}));

    // Default input
    assert((countingSort({4, 2, 2, 8, 3, 3, 1, 7, 5}) == std::vector<int>{1, 2, 2, 3, 3, 4, 5, 7, 8}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
