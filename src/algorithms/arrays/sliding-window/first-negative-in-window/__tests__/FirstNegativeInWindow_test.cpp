#include "../sources/FirstNegativeInWindow.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(firstNegativeInWindow({12, -1, -7, 8, -15, 30, 16, 28}, 3) == std::vector<int>({-1, -1, -7, -15, -15, 0}));
    assert(firstNegativeInWindow({1, 2, 3, 4, 5}, 3) == std::vector<int>({0, 0, 0}));
    assert(firstNegativeInWindow({-3, -5, -2, -8}, 2) == std::vector<int>({-3, -5, -2}));
    assert(firstNegativeInWindow({4, -2, 3, -1}, 1) == std::vector<int>({0, -2, 0, -1}));
    assert(firstNegativeInWindow({1, 2, -3, 4}, 4) == std::vector<int>({-3}));
    assert(firstNegativeInWindow({}, 3).empty());
    assert(firstNegativeInWindow({1, 2}, 5).empty());
    assert(firstNegativeInWindow({1, -2, 3}, 0).empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
