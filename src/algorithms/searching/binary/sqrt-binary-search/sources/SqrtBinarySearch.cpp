// Square Root via Binary Search — find the integer square root of a non-negative number
#include <cstdint>

int64_t sqrtBinarySearch(int64_t targetValue) {
    // @step:initialize
    if (targetValue < 2) return targetValue; // @step:initialize
    int64_t lowIndex = 1; // @step:initialize
    int64_t highIndex = targetValue / 2; // @step:initialize
    int64_t resultIndex = 0; // @step:initialize

    while (lowIndex <= highIndex) {
        int64_t midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int64_t midSquared = midIndex * midIndex; // @step:compare

        if (midSquared == targetValue) {
            // @step:compare,found
            return midIndex; // @step:found
        } else if (midSquared < targetValue) {
            // @step:eliminate
            // midIndex is a candidate floor — search for a larger value
            resultIndex = midIndex; // @step:eliminate
            lowIndex = midIndex + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // midIndex is too large — search left
            highIndex = midIndex - 1; // @step:eliminate
        }
    }

    return resultIndex; // @step:complete
}
