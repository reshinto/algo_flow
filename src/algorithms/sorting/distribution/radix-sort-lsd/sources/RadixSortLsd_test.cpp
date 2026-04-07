#include "RadixSortLsd.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array
    assert((radixSortLsd({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));

    // handles an already sorted array
    assert((radixSortLsd({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles a reverse-sorted array
    assert((radixSortLsd({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles an array with duplicate values
    assert((radixSortLsd({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));

    // handles a single element array
    assert((radixSortLsd({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((radixSortLsd({}) == std::vector<int>{}));

    // handles multi-digit numbers
    assert((radixSortLsd({170, 45, 75, 90, 802, 24, 2, 66}) == std::vector<int>{2, 24, 45, 66, 75, 90, 170, 802}));

    // handles negative numbers using offset
    assert((radixSortLsd({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = radixSortLsd(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
