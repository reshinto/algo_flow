// Minimum Subarray Sum — O(n) inverted Kadane's algorithm tracking minimum instead of maximum
#include <vector>
#include <tuple>

std::tuple<int, int, int> minimumSubarraySum(const std::vector<int>& inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {0, 0, 0}; // @step:initialize
    }

    int minEndingHere = inputArray[0]; // @step:initialize
    int minSoFar = inputArray[0]; // @step:initialize
    int currentStartIndex = 0;
    int bestStartIndex = 0;
    int bestEndIndex = 0;

    // Extend the current subarray or restart from the current element
    for (int elementIndex = 1; elementIndex < (int)inputArray.size(); elementIndex++) {
        if (inputArray[elementIndex] < minEndingHere + inputArray[elementIndex]) { // @step:compare
            minEndingHere = inputArray[elementIndex]; // @step:compare
            currentStartIndex = elementIndex; // @step:compare
        } else {
            minEndingHere += inputArray[elementIndex]; // @step:compare
        }

        if (minEndingHere < minSoFar) { // @step:compare
            minSoFar = minEndingHere; // @step:compare
            bestStartIndex = currentStartIndex; // @step:compare
            bestEndIndex = elementIndex; // @step:compare
        }
    }

    return {minSoFar, bestStartIndex, bestEndIndex}; // @step:complete
}
