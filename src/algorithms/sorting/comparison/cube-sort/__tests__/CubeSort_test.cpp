#include "../sources/CubeSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>
#include <numeric>
#include <algorithm>

int main() {
    assert((cubeSort({64, 34, 25, 12, 22, 11, 90}) == std::vector<int>{11, 12, 22, 25, 34, 64, 90}));
    assert((cubeSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((cubeSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((cubeSort({3, 1, 4, 1, 5, 9, 2, 6, 5}) == std::vector<int>{1, 1, 2, 3, 4, 5, 5, 6, 9}));
    assert((cubeSort({42}) == std::vector<int>{42}));
    assert((cubeSort({}) == std::vector<int>{}));
    assert((cubeSort({3, -1, 0, -5, 2}) == std::vector<int>{-5, -1, 0, 2, 3}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = cubeSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    // handles array of size 27 (perfect cube)
    std::vector<int> input27(27);
    std::iota(input27.begin(), input27.end(), 1);
    std::reverse(input27.begin(), input27.end());
    std::vector<int> expected27(27);
    std::iota(expected27.begin(), expected27.end(), 1);
    assert((cubeSort(input27) == expected27));

    assert((cubeSort({2, 1}) == std::vector<int>{1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
