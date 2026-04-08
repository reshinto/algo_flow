#include "../sources/FirstMissingPositive.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(firstMissingPositive({3, 4, -1, 1, 7, 5, 2}) == 6);
    assert(firstMissingPositive({1, 2, 0}) == 3);
    assert(firstMissingPositive({3, 4, -1, 1}) == 2);
    assert(firstMissingPositive({7, 8, 9, 11, 12}) == 1);
    assert(firstMissingPositive({}) == 1);
    assert(firstMissingPositive({1, 2, 3, 4, 5}) == 6);
    assert(firstMissingPositive({-1, -2, -3}) == 1);
    assert(firstMissingPositive({1}) == 2);
    assert(firstMissingPositive({2}) == 1);
    assert(firstMissingPositive({1, 1, 2, 2}) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
