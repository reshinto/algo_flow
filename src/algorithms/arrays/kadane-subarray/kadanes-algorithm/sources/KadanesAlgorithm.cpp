// Kadane's Algorithm — O(n) maximum subarray sum via extend-or-restart decision
#include <vector>
#include <tuple>

std::tuple<int, int, int> kadanesAlgorithm(const std::vector<int>& inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {0, -1, -1}; // @step:initialize
    }

    int currentSum = inputArray[0]; // @step:initialize
    int globalMax = inputArray[0]; // @step:initialize
    int currentStart = 0;
    int bestStart = 0;
    int bestEnd = 0;

    for (int scanIndex = 1; scanIndex < (int)inputArray.size(); scanIndex++) {
        int extendSum = currentSum + inputArray[scanIndex]; // @step:compare
        int restartSum = inputArray[scanIndex]; // @step:compare

        if (restartSum > extendSum) { // @step:compare
            currentSum = restartSum; // @step:shrink-window
            currentStart = scanIndex; // @step:shrink-window
        } else {
            currentSum = extendSum; // @step:expand-window
        }

        if (currentSum > globalMax) { // @step:visit
            globalMax = currentSum; // @step:visit
            bestStart = currentStart; // @step:visit
            bestEnd = scanIndex; // @step:visit
        }
    }

    return {globalMax, bestStart, bestEnd}; // @step:complete
}
