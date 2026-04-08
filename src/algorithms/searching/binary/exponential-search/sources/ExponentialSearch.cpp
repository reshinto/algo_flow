// Exponential Search — probe exponentially, then binary search in the bounded range
#include <vector>
#include <algorithm>

int exponentialSearch(const std::vector<int>& sortedArray, int targetValue) {
    int arrayLength = static_cast<int>(sortedArray.size()); // @step:initialize
    if (arrayLength == 0) {
        return -1; // @step:complete
    }

    if (sortedArray[0] == targetValue) {
        // @step:visit
        return 0; // @step:found
    }

    // Phase 1: exponential probing to find the upper bound
    int boundIndex = 1; // @step:visit
    while (boundIndex < arrayLength && sortedArray[boundIndex] <= targetValue) {
        // @step:visit
        boundIndex = boundIndex * 2; // @step:visit
    }

    // Phase 2: binary search in the range [boundIndex/2, min(boundIndex, length-1)]
    int lowIndex = boundIndex / 2; // @step:compare
    int highIndex = std::min(boundIndex, arrayLength - 1); // @step:compare

    while (lowIndex <= highIndex) {
        int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int midValue = sortedArray[midIndex]; // @step:compare

        if (midValue == targetValue) {
            // @step:compare,found
            return midIndex; // @step:found
        } else if (midValue < targetValue) {
            // @step:eliminate
            lowIndex = midIndex + 1; // @step:eliminate
        } else {
            // @step:eliminate
            highIndex = midIndex - 1; // @step:eliminate
        }
    }

    return -1; // @step:complete
}
