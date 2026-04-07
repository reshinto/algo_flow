#include "PairwiseSortingNetwork.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array
    assert((pairwiseSortingNetwork({5, 3, 8, 1, 4, 2, 7, 6}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8}));

    // handles an already sorted array
    assert((pairwiseSortingNetwork({1, 2, 3, 4}) == std::vector<int>{1, 2, 3, 4}));

    // handles a reverse-sorted array
    assert((pairwiseSortingNetwork({4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4}));

    // handles a single element array
    assert((pairwiseSortingNetwork({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((pairwiseSortingNetwork({}) == std::vector<int>{}));

    // handles an array with negative numbers
    assert((pairwiseSortingNetwork({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // does not mutate the original array
    std::vector<int> original = {4, 2, 3, 1};
    std::vector<int> sorted = pairwiseSortingNetwork(original);
    assert((sorted == std::vector<int>{1, 2, 3, 4}));
    assert((original == std::vector<int>{4, 2, 3, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
