#include "sources/SlowSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((slowSort({5, 3, 1, 4, 2}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((slowSort({1, 2, 3}) == std::vector<int>{1, 2, 3}));
    assert((slowSort({3, 2, 1}) == std::vector<int>{1, 2, 3}));
    assert((slowSort({3, 1, 2, 1, 3}) == std::vector<int>{1, 1, 2, 3, 3}));
    assert((slowSort({42}) == std::vector<int>{42}));
    assert((slowSort({}) == std::vector<int>{}));
    assert((slowSort({3, -1, 2}) == std::vector<int>{-1, 2, 3}));

    std::vector<int> original = {5, 3, 1, 4, 2};
    std::vector<int> sorted = slowSort(original);
    assert((sorted == std::vector<int>{1, 2, 3, 4, 5}));
    assert((original == std::vector<int>{5, 3, 1, 4, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
