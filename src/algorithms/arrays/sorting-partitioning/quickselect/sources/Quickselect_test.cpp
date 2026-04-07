#include "Quickselect.cpp"
#include <cassert>
#include <iostream>

int main() {
    // 4th smallest in [7,2,1,6,8,5,3,4] -> 4
    assert(quickselect({7, 2, 1, 6, 8, 5, 3, 4}, 4).first == 4);

    // Minimum (k=1)
    assert(quickselect({7, 2, 1, 6, 8, 5, 3, 4}, 1).first == 1);

    // Maximum (k=n)
    assert(quickselect({7, 2, 1, 6, 8, 5, 3, 4}, 8).first == 8);

    // Single element
    assert(quickselect({42}, 1).first == 42);

    // Invalid k=0
    assert(quickselect({1, 2, 3}, 0).first == -1);

    // Invalid k too large
    assert(quickselect({1, 2, 3}, 5).first == -1);

    // Empty array
    assert(quickselect({}, 1).first == -1);

    // Duplicates [3,3,1,2], k=2 -> 2
    assert(quickselect({3, 3, 1, 2}, 2).first == 2);

    // Median [3,1,4,1,5,9,2,6,5], k=5 -> 4
    assert(quickselect({3, 1, 4, 1, 5, 9, 2, 6, 5}, 5).first == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
