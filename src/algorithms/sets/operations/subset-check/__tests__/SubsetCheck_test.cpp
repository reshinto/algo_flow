#define TESTING
#include "../sources/SubsetCheck.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(subsetCheck({2, 4}, {1, 2, 3, 4, 5}) == true);
    assert(subsetCheck({2, 9}, {1, 2, 3, 4, 5}) == false);
    assert(subsetCheck({1, 2, 3}, {1, 2, 3}) == true);
    assert(subsetCheck({}, {1, 2, 3}) == true);
    assert(subsetCheck({1}, {}) == false);
    assert(subsetCheck({}, {}) == true);
    assert(subsetCheck({1, 2, 3, 4, 5}, {2, 4}) == false);
    assert(subsetCheck({3, 1, 2}, {1, 2, 3}) == true);
    assert(subsetCheck({7}, {5, 6, 7, 8}) == true);
    assert(subsetCheck({9}, {5, 6, 7, 8}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
