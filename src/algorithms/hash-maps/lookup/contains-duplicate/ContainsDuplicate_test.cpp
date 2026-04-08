#include "sources/ContainsDuplicate.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(containsDuplicate({1, 2, 3, 1}) == true);
    assert(containsDuplicate({1, 2, 3, 4}) == false);
    assert(containsDuplicate({42}) == false);
    assert(containsDuplicate({}) == false);
    assert(containsDuplicate({5, 5, 6, 7}) == true);
    assert(containsDuplicate({1, 2, 3, 4, 5, 1}) == true);
    assert(containsDuplicate({7, 7, 7, 7}) == true);
    assert(containsDuplicate({-1, -2, -3, -1}) == true);
    assert(containsDuplicate({-3, -2, -1, 0}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
