#include "KthSmallestElement.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(kthSmallestElement({7, 10, 4, 3, 20, 15, 8}, 3) == 7);
    assert(kthSmallestElement({7, 10, 4, 3, 20, 15, 8}, 1) == 3);
    assert(kthSmallestElement({7, 10, 4, 3, 20, 15, 8}, 7) == 20);
    assert(kthSmallestElement({42}, 1) == 42);
    assert(kthSmallestElement({5, 5, 5, 5}, 2) == 5);
    assert(kthSmallestElement({-1, -5, -3, -2, -4}, 2) == -4);
    assert(kthSmallestElement({10, 20}, 2) == 20);
    assert(kthSmallestElement({7, 10, 4, 3, 20, 15, 8}, 2) == 4);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
