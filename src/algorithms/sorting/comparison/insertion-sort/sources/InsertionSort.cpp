// Insertion Sort — insert each element into the correct position within the sorted prefix
#include <vector>

std::vector<int> insertionSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
        // @step:outer-loop
        int currentValue = sortedArray[outerIndex]; // @step:outer-loop
        int innerIndex = outerIndex - 1; // @step:outer-loop

        // Shift elements that are greater than currentValue one position to the right
        while (innerIndex >= 0 && sortedArray[innerIndex] > currentValue) {
            // @step:compare
            sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
            innerIndex--; // @step:swap
        }

        // Place currentValue in its correct sorted position
        sortedArray[innerIndex + 1] = currentValue; // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
