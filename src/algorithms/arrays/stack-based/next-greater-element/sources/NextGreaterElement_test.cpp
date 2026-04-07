#include "NextGreaterElement.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // Mixed array [4,5,2,10,8] -> [5,10,10,-1,-1]
    assert((nextGreaterElement({4, 5, 2, 10, 8}) == std::vector<int>{5, 10, 10, -1, -1}));

    // Strictly increasing [1,2,3,4] -> [2,3,4,-1]
    assert((nextGreaterElement({1, 2, 3, 4}) == std::vector<int>{2, 3, 4, -1}));

    // Strictly decreasing [4,3,2,1] -> [-1,-1,-1,-1]
    assert((nextGreaterElement({4, 3, 2, 1}) == std::vector<int>{-1, -1, -1, -1}));

    // All equal [5,5,5] -> [-1,-1,-1]
    assert((nextGreaterElement({5, 5, 5}) == std::vector<int>{-1, -1, -1}));

    // Single element [7] -> [-1]
    assert((nextGreaterElement({7}) == std::vector<int>{-1}));

    // Empty array
    assert(nextGreaterElement({}).empty());

    // Default input [4,5,2,10,8,1,3] -> [5,10,10,-1,-1,3,-1]
    assert((nextGreaterElement({4, 5, 2, 10, 8, 1, 3}) == std::vector<int>{5, 10, 10, -1, -1, 3, -1}));

    // With duplicates [2,1,2,4,3] -> [4,2,4,-1,-1]
    assert((nextGreaterElement({2, 1, 2, 4, 3}) == std::vector<int>{4, 2, 4, -1, -1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
