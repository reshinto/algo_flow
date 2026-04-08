// Double Selection Sort — find both minimum and maximum in each pass, place at both ends
#include <vector>
#include <algorithm>

std::vector<int> doubleSelectionSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    int leftBound = 0; // @step:initialize
    int rightBound = arrayLength - 1; // @step:initialize

    while (leftBound < rightBound) {
        int minimumIndex = leftBound; // @step:compare
        int maximumIndex = leftBound; // @step:compare

        // Scan between bounds to find both minimum and maximum
        for (int scanIndex = leftBound + 1; scanIndex <= rightBound; scanIndex++) {
            // @step:compare
            if (sortedArray[scanIndex] < sortedArray[minimumIndex]) {
                // @step:compare
                minimumIndex = scanIndex; // @step:compare
            }
            if (sortedArray[scanIndex] > sortedArray[maximumIndex]) {
                // @step:compare
                maximumIndex = scanIndex; // @step:compare
            }
        }

        // Swap minimum to left bound
        if (minimumIndex != leftBound) {
            // @step:swap
            std::swap(sortedArray[leftBound], sortedArray[minimumIndex]); // @step:swap
            // If maximum was at leftBound, it moved to minimumIndex
            if (maximumIndex == leftBound) {
                maximumIndex = minimumIndex; // @step:swap
            }
        }

        // Swap maximum to right bound
        if (maximumIndex != rightBound) {
            // @step:swap
            std::swap(sortedArray[rightBound], sortedArray[maximumIndex]); // @step:swap
        }

        // Both ends are now in their sorted positions
        // @step:mark-sorted
        leftBound++; // @step:mark-sorted
        rightBound--; // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
