#include "MissingNumber.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(missingNumber({3, 0, 1}) == 2);
    assert(missingNumber({0, 1}) == 2);
    assert(missingNumber({9, 6, 4, 2, 3, 5, 7, 0, 1}) == 8);
    assert(missingNumber({1}) == 0);
    assert(missingNumber({0}) == 1);
    assert(missingNumber({}) == 0);
    assert(missingNumber({0, 1, 2}) == 3);
    assert(missingNumber({0, 1, 2, 3, 4, 6}) == 5);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
