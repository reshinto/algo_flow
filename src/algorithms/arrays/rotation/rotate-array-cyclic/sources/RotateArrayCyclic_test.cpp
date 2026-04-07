#include "RotateArrayCyclic.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(rotateArrayCyclic({1, 2, 3, 4, 5, 6}, 2) == std::vector<int>({5, 6, 1, 2, 3, 4}));
    assert(rotateArrayCyclic({1, 2, 3, 4, 5}, 1) == std::vector<int>({5, 1, 2, 3, 4}));
    assert(rotateArrayCyclic({1, 2, 3, 4}, 4) == std::vector<int>({1, 2, 3, 4}));
    assert(rotateArrayCyclic({1, 2, 3, 4, 5, 6}, 8) == std::vector<int>({5, 6, 1, 2, 3, 4}));
    assert(rotateArrayCyclic({1, 2, 3, 4}, 0) == std::vector<int>({1, 2, 3, 4}));
    assert(rotateArrayCyclic({}, 3) == std::vector<int>({}));
    assert(rotateArrayCyclic({42}, 5) == std::vector<int>({42}));
    assert(rotateArrayCyclic({1, 2}, 1) == std::vector<int>({2, 1}));
    assert(rotateArrayCyclic({1, 2, 3, 4, 5, 6}, 1) == std::vector<int>({6, 1, 2, 3, 4, 5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
