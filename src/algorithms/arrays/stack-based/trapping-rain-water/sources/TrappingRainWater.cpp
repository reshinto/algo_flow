// Trapping Rain Water — O(n) two-pointer approach
#include <vector>
#include <utility>

std::pair<int, std::vector<int>> trappingRainWater(const std::vector<int>& heights) {
    int arrayLength = (int)heights.size();
    if (arrayLength == 0) {
        // @step:initialize
        return {0, {}}; // @step:initialize
    }

    int leftPointer = 0; // @step:initialize
    int rightPointer = arrayLength - 1; // @step:initialize
    int maxLeft = 0; // @step:initialize
    int maxRight = 0; // @step:initialize
    int totalWater = 0; // @step:initialize
    std::vector<int> waterPerIndex(arrayLength, 0); // @step:initialize

    while (leftPointer < rightPointer) {
        if (heights[leftPointer] <= heights[rightPointer]) { // @step:compare
            if (heights[leftPointer] >= maxLeft) { // @step:compare
                maxLeft = heights[leftPointer]; // @step:visit
            } else {
                waterPerIndex[leftPointer] = maxLeft - heights[leftPointer]; // @step:visit
                totalWater += waterPerIndex[leftPointer]; // @step:visit
            }
            leftPointer++; // @step:visit
        } else {
            if (heights[rightPointer] >= maxRight) { // @step:compare
                maxRight = heights[rightPointer]; // @step:visit
            } else {
                waterPerIndex[rightPointer] = maxRight - heights[rightPointer]; // @step:visit
                totalWater += waterPerIndex[rightPointer]; // @step:visit
            }
            rightPointer--; // @step:visit
        }
    }

    return {totalWater, waterPerIndex}; // @step:complete
}
