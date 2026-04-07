#include "DifferenceArray.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(differenceArray(5, {{1, 3, 3}}) == std::vector<int>({0, 3, 3, 3, 0}));
    assert(differenceArray(5, {{0, 4, 1}, {1, 3, 2}}) == std::vector<int>({1, 3, 3, 3, 1}));
    assert(differenceArray(4, {{0, 3, 5}}) == std::vector<int>({5, 5, 5, 5}));
    assert(differenceArray(4, {{2, 2, 7}}) == std::vector<int>({0, 0, 7, 0}));
    assert(differenceArray(5, {}) == std::vector<int>({0, 0, 0, 0, 0}));
    assert(differenceArray(5, {{1, 3, -4}}) == std::vector<int>({0, -4, -4, -4, 0}));
    assert(differenceArray(8, {{1, 4, 3}, {2, 6, -1}, {0, 3, 2}}) == std::vector<int>({2, 5, 4, 4, 2, -1, -1, 0}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
