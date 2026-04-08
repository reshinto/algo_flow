#include "../sources/InsertionSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((insertionSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));
    assert((insertionSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((insertionSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((insertionSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((insertionSort({42}) == std::vector<int>{42}));
    assert((insertionSort({}) == std::vector<int>{}));
    assert((insertionSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = insertionSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
