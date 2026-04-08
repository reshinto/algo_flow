#include "sources/KthLargestElement.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(kthLargestElement({3, 1, 5, 12, 2, 11, 7, 9}, 3) == 9);
    assert(kthLargestElement({3, 1, 5, 12, 2, 11, 7, 9}, 1) == 12);
    assert(kthLargestElement({3, 1, 5, 12, 2, 11, 7, 9}, 8) == 1);
    assert(kthLargestElement({42}, 1) == 42);
    assert(kthLargestElement({5, 5, 5, 5}, 2) == 5);
    assert(kthLargestElement({-1, -5, -3, -2, -4}, 2) == -2);
    assert(kthLargestElement({10, 20}, 2) == 10);
    assert(kthLargestElement({7, 10, 4, 3, 20, 15, 8}, 2) == 15);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
