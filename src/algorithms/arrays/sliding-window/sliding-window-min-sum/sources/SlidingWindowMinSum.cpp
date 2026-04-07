// Sliding Window Min Sum — O(n) minimum-sum subarray of fixed size
#include <vector>
#include <utility>

std::pair<int, int> minSumSubarray(const std::vector<int>& inputArray, int windowSize) {
    if (inputArray.empty() || windowSize <= 0 || windowSize > (int)inputArray.size()) {
        // @step:initialize
        return {0, 0}; // @step:initialize
    }

    // Compute the sum of the first window as the baseline
    int currentSum = 0; // @step:move-window
    for (int initIndex = 0; initIndex < windowSize; initIndex++) { // @step:move-window
        currentSum += inputArray[initIndex]; // @step:move-window
    }
    int minSum = currentSum;
    int windowStartIndex = 0;

    // Slide the window: subtract left element, add right element
    for (int rightIndex = windowSize; rightIndex < (int)inputArray.size(); rightIndex++) {
        currentSum -= inputArray[rightIndex - windowSize]; // @step:shrink-window
        currentSum += inputArray[rightIndex]; // @step:expand-window

        if (currentSum < minSum) { // @step:compare
            minSum = currentSum; // @step:compare
            windowStartIndex = rightIndex - windowSize + 1; // @step:compare
        }
    }

    return {minSum, windowStartIndex}; // @step:complete
}
