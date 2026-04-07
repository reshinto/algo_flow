#include "HeapSortVisualization.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // Test: sorts the default input
    assert(heapSortVisualization({9, 5, 7, 1, 3, 8, 2, 6, 4}) == std::vector<int>({1, 2, 3, 4, 5, 6, 7, 8, 9}));

    // Test: already sorted
    assert(heapSortVisualization({1, 2, 3, 4, 5}) == std::vector<int>({1, 2, 3, 4, 5}));

    // Test: reverse sorted
    assert(heapSortVisualization({5, 4, 3, 2, 1}) == std::vector<int>({1, 2, 3, 4, 5}));

    // Test: duplicates
    assert(heapSortVisualization({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>({1, 1, 2, 3, 4, 5, 5, 6, 9}));

    // Test: single element
    assert(heapSortVisualization({42}) == std::vector<int>({42}));

    // Test: empty array
    assert(heapSortVisualization({}) == std::vector<int>({}));

    // Test: two elements
    assert(heapSortVisualization({2, 1}) == std::vector<int>({1, 2}));

    // Test: negative values
    assert(heapSortVisualization({-3, 1, -5, 4, 0}) == std::vector<int>({-5, -3, 0, 1, 4}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
