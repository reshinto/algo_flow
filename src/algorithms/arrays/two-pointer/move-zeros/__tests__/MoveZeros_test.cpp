#include "../sources/MoveZeros.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Moves zeros to end
    assert((moveZeros({0, 1, 0, 3, 12}) == std::vector<int>{1, 3, 12, 0, 0}));

    // No zeros -> unchanged
    assert((moveZeros({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));

    // All zeros
    assert((moveZeros({0, 0, 0}) == std::vector<int>{0, 0, 0}));

    // Empty array
    assert(moveZeros({}).empty());

    // Zeros at start
    assert((moveZeros({0, 0, 1, 2}) == std::vector<int>{1, 2, 0, 0}));

    // Zeros already at end
    assert((moveZeros({1, 2, 3, 0, 0}) == std::vector<int>{1, 2, 3, 0, 0}));

    // Default input
    assert((moveZeros({0, 1, 0, 3, 12, 0, 5}) == std::vector<int>{1, 3, 12, 5, 0, 0, 0}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
