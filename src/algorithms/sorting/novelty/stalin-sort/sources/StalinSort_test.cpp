#include "StalinSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // eliminates out-of-order elements from [3, 1, 2]
    // 3 survives (first), 1 < 3 eliminated, 2 < 3 eliminated -> [3]
    assert((stalinSort({3, 1, 2}) == std::vector<int>{3}));

    // keeps all elements when array is already sorted
    assert((stalinSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // reduces a reverse-sorted array to its first element
    assert((stalinSort({5, 4, 3, 2, 1}) == std::vector<int>{5}));

    // handles an array with partial order
    assert((stalinSort({3, 1, 4, 2, 5}) == std::vector<int>{3, 4, 5}));

    // handles an array with equal elements
    assert((stalinSort({2, 2, 2, 2}) == std::vector<int>{2, 2, 2, 2}));

    // handles a single element array
    assert((stalinSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((stalinSort({}) == std::vector<int>{}));

    // handles an array with duplicate max values
    assert((stalinSort({5, 3, 5}) == std::vector<int>{5, 5}));

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> result = stalinSort(original);
    assert((result == std::vector<int>{3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
