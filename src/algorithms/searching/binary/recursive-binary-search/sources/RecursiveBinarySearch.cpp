// Recursive Binary Search — halve the search range via recursive calls
#include <vector>

static int searchRange(const std::vector<int>& sortedArray, int targetValue, int lowIndex, int highIndex) {
    // @step:initialize
    if (lowIndex > highIndex) {
        // @step:complete
        return -1; // @step:complete
    }

    int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
    int midValue = sortedArray[midIndex]; // @step:compare

    if (midValue == targetValue) {
        // @step:compare,found
        return midIndex; // @step:found
    } else if (midValue < targetValue) {
        // @step:eliminate
        // Target is in the upper half — discard the lower half
        return searchRange(sortedArray, targetValue, midIndex + 1, highIndex); // @step:eliminate
    } else {
        // @step:eliminate
        // Target is in the lower half — discard the upper half
        return searchRange(sortedArray, targetValue, lowIndex, midIndex - 1); // @step:eliminate
    }
}

int recursiveBinarySearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    return searchRange(sortedArray, targetValue, 0, static_cast<int>(sortedArray.size()) - 1); // @step:complete
}
