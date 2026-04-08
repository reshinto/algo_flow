// First Missing Positive — O(n) time, O(1) space via index-as-value placement
#include <vector>

int firstMissingPositive(std::vector<int> inputArray) {
    std::vector<int> result = inputArray;
    int arrayLength = (int)result.size(); // @step:initialize

    // Phase 1: Place each value v in range [1..n] at index v-1 by swapping
    for (int placementIndex = 0; placementIndex < arrayLength; placementIndex++) {
        // Keep swapping until the current slot holds its correct value or an out-of-range value
        while (result[placementIndex] >= 1
               && result[placementIndex] <= arrayLength
               && result[result[placementIndex] - 1] != result[placementIndex]
               && result[placementIndex] != placementIndex + 1) {
            int correctIndex = result[placementIndex] - 1; // @step:compare
            int tempValue = result[correctIndex]; // @step:swap
            result[correctIndex] = result[placementIndex]; // @step:swap
            result[placementIndex] = tempValue; // @step:swap
        }
    }

    // Phase 2: Scan for the first index where arr[index] !== index + 1
    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
        if (result[scanIndex] != scanIndex + 1) {
            return scanIndex + 1; // @step:compare
        }
    }

    return arrayLength + 1; // @step:complete
}
