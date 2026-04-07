// Binary Search — halve the search range on each iteration
#include <vector>

int binarySearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int lowIndex = 0; // @step:initialize
    int highIndex = static_cast<int>(sortedArray.size()) - 1; // @step:initialize

    while (lowIndex <= highIndex) {
        int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int midValue = sortedArray[midIndex]; // @step:compare

        if (midValue == targetValue) {
            // @step:compare,found
            return midIndex; // @step:found
        } else if (midValue < targetValue) {
            // @step:eliminate
            // Target is in the upper half — discard the lower half
            lowIndex = midIndex + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Target is in the lower half — discard the upper half
            highIndex = midIndex - 1; // @step:eliminate
        }
    }

    return -1; // @step:complete
}
