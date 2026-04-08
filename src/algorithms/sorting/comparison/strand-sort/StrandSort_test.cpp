#include "sources/StrandSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((strandSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));
    assert((strandSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((strandSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((strandSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((strandSort({42}) == std::vector<int>{42}));
    assert((strandSort({}) == std::vector<int>{}));
    assert((strandSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = strandSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    assert((strandSort({2, 1}) == std::vector<int>{1, 2}));
    assert((strandSort({3, 1, 4, 2, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
