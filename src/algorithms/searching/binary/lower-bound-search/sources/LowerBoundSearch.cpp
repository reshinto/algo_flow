// Lower Bound Search — find the first position where element >= target
#include <vector>

int lowerBoundSearch(const std::vector<int>& sortedArray, int targetValue) {
    // @step:initialize
    int lowIndex = 0; // @step:initialize
    int highIndex = static_cast<int>(sortedArray.size()); // @step:initialize
    int resultIndex = static_cast<int>(sortedArray.size()); // @step:initialize

    while (lowIndex < highIndex) {
        int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int midValue = sortedArray[midIndex]; // @step:compare

        if (midValue >= targetValue) {
            // @step:compare,found
            // midValue is a candidate — record it and search for an earlier occurrence
            resultIndex = midIndex; // @step:found
            highIndex = midIndex; // @step:eliminate
        } else {
            // @step:eliminate
            // midValue is too small — the lower bound must be to the right
            lowIndex = midIndex + 1; // @step:eliminate
        }
    }

    return resultIndex; // @step:complete
}
