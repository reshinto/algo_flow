#include "DoubleSelectionSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array
    assert((doubleSelectionSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));

    // handles an already sorted array
    assert((doubleSelectionSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles a reverse-sorted array
    assert((doubleSelectionSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles an array with duplicate values
    assert((doubleSelectionSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));

    // handles a single element array
    assert((doubleSelectionSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((doubleSelectionSort({}) == std::vector<int>{}));

    // handles an array with negative numbers
    assert((doubleSelectionSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // handles an even-length array
    assert((doubleSelectionSort({4, 2, 6, 1}) == std::vector<int>{1, 2, 4, 6}));

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = doubleSelectionSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
