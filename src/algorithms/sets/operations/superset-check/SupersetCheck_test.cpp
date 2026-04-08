#define TESTING
#include "sources/SupersetCheck.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(supersetCheck({1, 2, 3, 4, 5}, {2, 4}) == true);
    assert(supersetCheck({1, 2, 3, 4, 5}, {2, 9}) == false);
    assert(supersetCheck({1, 2, 3}, {1, 2, 3}) == true);
    assert(supersetCheck({1, 2, 3}, {}) == true);
    assert(supersetCheck({}, {1}) == false);
    assert(supersetCheck({}, {}) == true);
    assert(supersetCheck({2, 4}, {1, 2, 3, 4, 5}) == false);
    assert(supersetCheck({1, 2, 3}, {3, 1, 2}) == true);
    assert(supersetCheck({5, 6, 7, 8}, {7}) == true);
    assert(supersetCheck({5, 6, 7, 8}, {9}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
