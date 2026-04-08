#include "sources/ProductExceptSelf.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(productExceptSelf({1, 2, 3, 4}) == std::vector<int>({24, 12, 8, 6}));
    assert(productExceptSelf({1, 2, 3, 4, 5}) == std::vector<int>({120, 60, 40, 30, 24}));
    assert(productExceptSelf({1, 0, 3}) == std::vector<int>({0, 3, 0}));
    assert(productExceptSelf({0, 1, 0}) == std::vector<int>({0, 0, 0}));
    assert(productExceptSelf({5}) == std::vector<int>({1}));
    assert(productExceptSelf({}) == std::vector<int>({}));
    assert(productExceptSelf({1, 1, 1}) == std::vector<int>({1, 1, 1}));
    assert(productExceptSelf({-1, 2, -3}) == std::vector<int>({-6, 3, -2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
