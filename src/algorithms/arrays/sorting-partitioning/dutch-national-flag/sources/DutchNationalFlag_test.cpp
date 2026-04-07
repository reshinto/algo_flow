#include "DutchNationalFlag.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Mixed array
    assert((dutchNationalFlag({2, 0, 1, 2, 1, 0}) == std::vector<int>{0, 0, 1, 1, 2, 2}));

    // Already sorted
    assert((dutchNationalFlag({0, 0, 1, 1, 2, 2}) == std::vector<int>{0, 0, 1, 1, 2, 2}));

    // Reverse sorted
    assert((dutchNationalFlag({2, 2, 1, 1, 0, 0}) == std::vector<int>{0, 0, 1, 1, 2, 2}));

    // All zeros
    assert((dutchNationalFlag({0, 0, 0}) == std::vector<int>{0, 0, 0}));

    // All ones
    assert((dutchNationalFlag({1, 1, 1}) == std::vector<int>{1, 1, 1}));

    // All twos
    assert((dutchNationalFlag({2, 2, 2}) == std::vector<int>{2, 2, 2}));

    // Empty array
    assert(dutchNationalFlag({}).empty());

    // Default input
    assert((dutchNationalFlag({2, 0, 1, 2, 1, 0, 0, 2, 1}) == std::vector<int>{0, 0, 0, 1, 1, 1, 2, 2, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
