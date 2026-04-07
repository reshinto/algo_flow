#include "ContiguousArray.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(contiguousArray({0, 1, 0, 1, 1, 0}) == 6);
    assert(contiguousArray({0, 1}) == 2);
    assert(contiguousArray({0, 1, 0}) == 2);
    assert(contiguousArray({0, 0, 0}) == 0);
    assert(contiguousArray({1, 1, 1}) == 0);
    assert(contiguousArray({}) == 0);
    assert(contiguousArray({0, 0, 1, 1}) == 4);
    assert(contiguousArray({1, 0, 1, 0, 1}) == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
