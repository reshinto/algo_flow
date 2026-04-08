#include "sources/TreeSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((treeSort({5, 3, 7, 1, 4, 6, 2}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7}));
    assert((treeSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((treeSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((treeSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((treeSort({42}) == std::vector<int>{42}));
    assert((treeSort({}) == std::vector<int>{}));
    assert((treeSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = treeSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
