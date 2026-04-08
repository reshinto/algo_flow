// Max Product Subarray — O(n) tracking both max and min products to handle negative flips
#include <vector>
#include <algorithm>
#include <tuple>

std::tuple<int, int, int> maxProductSubarray(const std::vector<int>& inputArray) {
    int arrayLength = (int)inputArray.size();

    if (arrayLength == 0) {
        // @step:initialize
        return {0, 0, 0}; // @step:initialize
    }

    int currentMax = inputArray[0]; // @step:initialize
    int currentMin = inputArray[0]; // @step:initialize
    int globalMax = inputArray[0]; // @step:initialize
    int currentStart = 0;
    int bestStart = 0;
    int bestEnd = 0;

    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        int currentElement = inputArray[scanIndex]; // @step:compare

        // When multiplying by a negative, max and min swap roles
        if (currentElement < 0) { // @step:compare
            int tempMax = currentMax; // @step:compare
            currentMax = currentMin; // @step:compare
            currentMin = tempMax; // @step:compare
        }

        // Extend or restart the subarray
        currentMax = std::max(currentElement, currentMax * currentElement); // @step:compare
        currentMin = std::min(currentElement, currentMin * currentElement); // @step:compare

        if (currentMax == currentElement) { // @step:compare
            currentStart = scanIndex; // @step:compare
        }

        if (currentMax > globalMax) { // @step:compare
            globalMax = currentMax; // @step:compare
            bestStart = currentStart; // @step:compare
            bestEnd = scanIndex; // @step:compare
        }
    }

    return {globalMax, bestStart, bestEnd}; // @step:complete
}
