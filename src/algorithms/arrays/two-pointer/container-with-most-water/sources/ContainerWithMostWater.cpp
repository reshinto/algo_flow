// Container With Most Water — two pointers converge inward, always moving the shorter bar to maximize area
#include <vector>
#include <tuple>
#include <algorithm>

std::tuple<int, int, int> containerWithMostWater(const std::vector<int>& heights) {
    int leftPointer = 0; // @step:initialize
    int rightPointer = (int)heights.size() - 1; // @step:initialize
    int maxArea = 0; // @step:initialize
    int bestLeft = 0; // @step:initialize
    int bestRight = (int)heights.size() - 1; // @step:initialize

    while (leftPointer < rightPointer) {
        int leftHeight = heights[leftPointer]; // @step:visit
        int rightHeight = heights[rightPointer]; // @step:visit
        int currentArea = std::min(leftHeight, rightHeight) * (rightPointer - leftPointer); // @step:compare

        if (currentArea > maxArea) { // @step:compare
            maxArea = currentArea; // @step:compare
            bestLeft = leftPointer; // @step:compare
            bestRight = rightPointer; // @step:compare
        }

        if (leftHeight <= rightHeight) { // @step:compare
            leftPointer++; // @step:visit
        } else {
            rightPointer--; // @step:visit
        }
    }

    return {maxArea, bestLeft, bestRight}; // @step:complete
}
