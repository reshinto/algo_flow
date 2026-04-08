#include "../sources/FindMissingNumber.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(findMissingNumber({3, 0, 1}) == 2);
    assert(findMissingNumber({1, 2, 3}) == 0);
    assert(findMissingNumber({0, 1, 2}) == 3);
    assert(findMissingNumber({0}) == 1);
    assert(findMissingNumber({1}) == 0);
    assert(findMissingNumber({}) == 0);
    assert(findMissingNumber({0, 1, 2, 3, 5, 6, 7, 8, 9}) == 4);
    assert(findMissingNumber({0, 1, 3, 4, 5, 6, 7}) == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
