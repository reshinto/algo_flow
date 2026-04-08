#include "sources/LargestRectangleHistogram.cpp"
#include <cassert>
#include <iostream>

int main() {
    // Default input [2,1,5,6,2,3] -> maxArea=10 at span [2,3] height 5
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({2, 1, 5, 6, 2, 3});
        assert(maxArea == 10);
        assert(leftIndex == 2);
        assert(rightIndex == 3);
        assert(height == 5);
    }

    // Empty array
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({});
        assert(maxArea == 0);
        assert(leftIndex == -1);
        assert(rightIndex == -1);
    }

    // Single bar [5]
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({5});
        assert(maxArea == 5);
        assert(leftIndex == 0);
        assert(rightIndex == 0);
        assert(height == 5);
    }

    // All equal bars [3,3,3,3] -> maxArea=12
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({3, 3, 3, 3});
        assert(maxArea == 12);
    }

    // Strictly increasing [1,2,3,4,5] -> maxArea=9
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({1, 2, 3, 4, 5});
        assert(maxArea == 9);
    }

    // Valley shape [5,0,5] -> maxArea=5
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({5, 0, 5});
        assert(maxArea == 5);
    }

    // Two tall bars [6,6] -> maxArea=12
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({6, 6});
        assert(maxArea == 12);
    }

    // Spike in middle [2,10,2] -> maxArea=10
    {
        auto [maxArea, leftIndex, rightIndex, height] = largestRectangleHistogram({2, 10, 2});
        assert(maxArea == 10);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
