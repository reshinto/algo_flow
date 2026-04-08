#include "../sources/RotateArray.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(rotateArray({1, 2, 3, 4, 5, 6, 7}, 3) == std::vector<int>({5, 6, 7, 1, 2, 3, 4}));
    assert(rotateArray({1, 2, 3, 4, 5}, 0) == std::vector<int>({1, 2, 3, 4, 5}));
    assert(rotateArray({1, 2, 3, 4, 5}, 5) == std::vector<int>({1, 2, 3, 4, 5}));
    assert(rotateArray({42}, 1) == std::vector<int>({42}));
    assert(rotateArray({}, 3) == std::vector<int>({}));
    assert(rotateArray({1, 2}, 1) == std::vector<int>({2, 1}));
    assert(rotateArray({1, 2, 3, 4, 5}, 4) == std::vector<int>({2, 3, 4, 5, 1}));
    assert(rotateArray({1, 2, 3}, 6) == std::vector<int>({1, 2, 3}));
    assert(rotateArray({1, 2, 3, 4, 5}, 1) == std::vector<int>({5, 1, 2, 3, 4}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
