#include "BitonicSortNetwork.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array of power-of-2 size
    assert((bitonicSortNetwork({6, 3, 8, 1, 7, 2, 5, 4}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8}));

    // sorts an array that is not a power of 2
    assert((bitonicSortNetwork({5, 3, 1, 4, 2}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles an already sorted array
    assert((bitonicSortNetwork({1, 2, 3, 4}) == std::vector<int>{1, 2, 3, 4}));

    // handles a reverse-sorted array
    assert((bitonicSortNetwork({4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4}));

    // handles an array with duplicate values
    assert((bitonicSortNetwork({3, 1, 4, 1, 5, 9, 2, 6}) == std::vector<int>{1, 1, 2, 3, 4, 5, 6, 9}));

    // handles a single element array
    assert((bitonicSortNetwork({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((bitonicSortNetwork({}) == std::vector<int>{}));

    // handles an array with negative numbers
    assert((bitonicSortNetwork({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // does not mutate the original array
    std::vector<int> original = {4, 2, 3, 1};
    std::vector<int> sorted = bitonicSortNetwork(original);
    assert((sorted == std::vector<int>{1, 2, 3, 4}));
    assert((original == std::vector<int>{4, 2, 3, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
