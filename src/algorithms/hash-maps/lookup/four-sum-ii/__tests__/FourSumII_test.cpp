#include "../sources/FourSumII.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(fourSumII({1, 2}, {-2, -1}, {-1, 2}, {0, 2}) == 2);
    assert(fourSumII({1, 2}, {3, 4}, {5, 6}, {7, 8}) == 0);
    assert(fourSumII({0, 0}, {0, 0}, {0, 0}, {0, 0}) == 16);
    assert(fourSumII({1}, {-1}, {1}, {-1}) == 1);
    assert(fourSumII({-1, -2}, {1, 2}, {1, 2}, {-1, -2}) == 6);
    assert(fourSumII({1, 1}, {-1, -1}, {0}, {0}) == 4);
    assert(fourSumII({1000}, {-1000}, {500}, {-500}) == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
