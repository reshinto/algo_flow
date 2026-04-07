// Min Size Subarray Sum — O(n) variable sliding window to find shortest subarray with sum >= target
#include <vector>
#include <climits>
#include <utility>

std::pair<int, int> minSizeSubarraySum(const std::vector<int>& inputArray, int target) {
    if (inputArray.empty() || target <= 0) {
        // @step:initialize
        return {0, 0}; // @step:initialize
    }

    int leftPointer = 0; // @step:initialize
    int currentSum = 0;
    int minLength = INT_MAX;
    int bestStartIndex = 0;

    // Expand the right boundary of the window
    for (int rightPointer = 0; rightPointer < (int)inputArray.size(); rightPointer++) {
        currentSum += inputArray[rightPointer]; // @step:expand-window

        // Shrink from the left while the sum constraint is satisfied
        while (currentSum >= target) { // @step:compare
            int windowLength = rightPointer - leftPointer + 1; // @step:compare
            if (windowLength < minLength) { // @step:compare
                minLength = windowLength; // @step:compare
                bestStartIndex = leftPointer; // @step:compare
            }
            currentSum -= inputArray[leftPointer]; // @step:shrink-window
            leftPointer++; // @step:shrink-window
        }
    }

    if (minLength == INT_MAX) {
        return {0, 0}; // @step:complete
    }
    return {minLength, bestStartIndex}; // @step:complete
}
