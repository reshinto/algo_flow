#include "sources/TwoSum.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((twoSum({2, 7, 11, 15}, 9) == std::vector<int>{0, 1}));
    assert((twoSum({3, 2, 4}, 6) == std::vector<int>{1, 2}));
    assert((twoSum({3, 3}, 6) == std::vector<int>{0, 1}));
    assert((twoSum({-3, 4, 3, 90}, 0) == std::vector<int>{0, 2}));
    assert((twoSum({-1, 0, 1, 2}, 0) == std::vector<int>{0, 2}));
    assert((twoSum({5, 3, 1, 9}, 8) == std::vector<int>{0, 1}));
    assert((twoSum({4, 6}, 10) == std::vector<int>{0, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
