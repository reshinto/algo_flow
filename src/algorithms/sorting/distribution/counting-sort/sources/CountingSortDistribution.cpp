// Counting Sort — count occurrences of each value, then place elements in sorted order
#include <vector>
#include <algorithm>

std::vector<int> countingSortDistribution(std::vector<int> inputArray) {
    // @step:initialize
    if (inputArray.empty()) return {}; // @step:initialize
    std::vector<int> workingArray = inputArray; // @step:initialize
    int arrayLength = workingArray.size(); // @step:initialize

    // Find the range of values
    int minValue = workingArray[0]; // @step:initialize
    int maxValue = workingArray[0]; // @step:initialize
    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        // @step:initialize
        if (workingArray[scanIndex] < minValue) minValue = workingArray[scanIndex]; // @step:initialize
        if (workingArray[scanIndex] > maxValue) maxValue = workingArray[scanIndex]; // @step:initialize
    }

    int range = maxValue - minValue + 1; // @step:initialize
    std::vector<int> countArray(range, 0); // @step:initialize

    // Count occurrences of each value
    for (int countIndex = 0; countIndex < arrayLength; countIndex++) {
        // @step:count,compare
        int bucketPosition = workingArray[countIndex] - minValue; // @step:count,compare
        countArray[bucketPosition]++; // @step:count
    }

    // Place elements back into the array in sorted order
    int writeIndex = 0; // @step:place
    for (int valueIndex = 0; valueIndex < range; valueIndex++) {
        // @step:place
        while (countArray[valueIndex] > 0) {
            // @step:place
            workingArray[writeIndex] = valueIndex + minValue; // @step:place
            writeIndex++; // @step:place
            countArray[valueIndex]--; // @step:place
        }
    }

    // @step:mark-sorted
    return workingArray; // @step:complete
}
