#include "sources/ContainsDuplicateII.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(containsDuplicateII({1, 2, 3, 1}, 3) == true);
    assert(containsDuplicateII({1, 2, 3, 1}, 2) == false);
    assert(containsDuplicateII({1, 1, 3, 4}, 1) == true);
    assert(containsDuplicateII({1, 2, 3, 4}, 3) == false);
    assert(containsDuplicateII({42}, 1) == false);
    assert(containsDuplicateII({}, 0) == false);
    assert(containsDuplicateII({1, 2, 3, 4, 1}, 4) == true);
    assert(containsDuplicateII({1, 2, 3, 4}, 0) == false);
    assert(containsDuplicateII({-1, 0, -1}, 2) == true);
    assert(containsDuplicateII({1, 2, 1, 2}, 1) == false);
    assert(containsDuplicateII({1, 0, 1, 1}, 1) == true);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
