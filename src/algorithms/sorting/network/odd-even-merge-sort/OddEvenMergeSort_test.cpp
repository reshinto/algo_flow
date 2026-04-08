#include "sources/OddEvenMergeSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array
    assert((oddEvenMergeSort({6, 3, 8, 1, 7, 2, 5, 4}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8}));

    // handles an already sorted array
    assert((oddEvenMergeSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles a reverse-sorted array
    assert((oddEvenMergeSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles an array with duplicate values
    assert((oddEvenMergeSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));

    // handles a single element array
    assert((oddEvenMergeSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((oddEvenMergeSort({}) == std::vector<int>{}));

    // handles an array with negative numbers
    assert((oddEvenMergeSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // does not mutate the original array
    std::vector<int> original = {4, 2, 3, 1};
    std::vector<int> sorted = oddEvenMergeSort(original);
    assert((sorted == std::vector<int>{1, 2, 3, 4}));
    assert((original == std::vector<int>{4, 2, 3, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
