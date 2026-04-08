#include "../sources/SpaghettiSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts an unsorted array
    assert((spaghettiSort({5, 3, 8, 1, 4, 2, 7, 6}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8}));

    // handles an already sorted array
    assert((spaghettiSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles a reverse-sorted array
    assert((spaghettiSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));

    // handles an array with duplicate values
    assert((spaghettiSort({3, 1, 4, 1, 5, 9, 2, 6}) == std::vector<int>{1, 1, 2, 3, 4, 5, 6, 9}));

    // handles a single element array
    assert((spaghettiSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((spaghettiSort({}) == std::vector<int>{}));

    // handles an array with negative numbers
    assert((spaghettiSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = spaghettiSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
