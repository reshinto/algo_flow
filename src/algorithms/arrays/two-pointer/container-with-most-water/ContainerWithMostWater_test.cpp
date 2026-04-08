#include "sources/ContainerWithMostWater.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>

int main() {
    // Default input [1,8,6,2,5,4,8,3,7] -> maxArea=49
    assert(std::get<0>(containerWithMostWater({1, 8, 6, 2, 5, 4, 8, 3, 7})) == 49);

    // Two equal bars [1,1] -> maxArea=1
    assert(std::get<0>(containerWithMostWater({1, 1})) == 1);

    // All equal [5,5,5,5] -> maxArea=15
    assert(std::get<0>(containerWithMostWater({5, 5, 5, 5})) == 15);

    // Single element -> maxArea=0
    assert(std::get<0>(containerWithMostWater({7})) == 0);

    // Empty array -> maxArea=0
    assert(std::get<0>(containerWithMostWater({})) == 0);

    // Monotonically increasing [1,2,3,4,5] -> maxArea=6
    assert(std::get<0>(containerWithMostWater({1, 2, 3, 4, 5})) == 6);

    // Monotonically decreasing [5,4,3,2,1] -> maxArea=6
    assert(std::get<0>(containerWithMostWater({5, 4, 3, 2, 1})) == 6);

    // Validate area at returned indices
    {
        std::vector<int> heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        auto [maxArea, leftIndex, rightIndex] = containerWithMostWater(heights);
        int computedArea = std::min(heights[leftIndex], heights[rightIndex]) * (rightIndex - leftIndex);
        assert(computedArea == maxArea);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
