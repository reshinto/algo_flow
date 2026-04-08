#include "sources/IntroSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((introSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));
    assert((introSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((introSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((introSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((introSort({42}) == std::vector<int>{42}));
    assert((introSort({}) == std::vector<int>{}));
    assert((introSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = introSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    assert((introSort({64, 34, 25, 12, 22, 11, 90, 55, 47, 8}) == std::vector<int>{8, 11, 12, 22, 25, 34, 47, 55, 64, 90}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
