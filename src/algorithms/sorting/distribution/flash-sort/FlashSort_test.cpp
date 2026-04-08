#include "sources/FlashSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((flashSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));
    assert((flashSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((flashSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((flashSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((flashSort({42}) == std::vector<int>{42}));
    assert((flashSort({}) == std::vector<int>{}));
    assert((flashSort({7, 7, 7, 7}) == std::vector<int>{7, 7, 7, 7}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = flashSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
