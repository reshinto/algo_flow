#include "PreviousSmallerElement.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Default input [4,10,5,8,20,15,3,12]
    assert((previousSmallerElement({4, 10, 5, 8, 20, 15, 3, 12}) == std::vector<int>{-1, 4, 4, 5, 8, 8, -1, 3}));

    // Strictly decreasing -> all -1
    assert((previousSmallerElement({5, 4, 3, 2, 1}) == std::vector<int>{-1, -1, -1, -1, -1}));

    // Strictly increasing -> previous element each time
    assert((previousSmallerElement({1, 2, 3, 4, 5}) == std::vector<int>{-1, 1, 2, 3, 4}));

    // All equal -> all -1 (not strictly smaller)
    assert((previousSmallerElement({3, 3, 3, 3}) == std::vector<int>{-1, -1, -1, -1}));

    // Single element
    assert((previousSmallerElement({7}) == std::vector<int>{-1}));

    // Empty array
    assert(previousSmallerElement({}).empty());

    // Valley-peak [1,3,2,4]
    assert((previousSmallerElement({1, 3, 2, 4}) == std::vector<int>{-1, 1, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
