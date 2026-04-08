// Odd-Even Sort — alternates between comparing odd-indexed and even-indexed adjacent pairs
#include <vector>
#include <algorithm>

std::vector<int> oddEvenSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    bool sorted = false; // @step:initialize

    while (!sorted) {
        sorted = true;

        // Odd phase: compare pairs at (1,2), (3,4), (5,6), ...
        // @step:odd-phase
        for (int oddIndex = 1; oddIndex < arrayLength - 1; oddIndex += 2) {
            // @step:compare
            if (sortedArray[oddIndex] > sortedArray[oddIndex + 1]) {
                // @step:swap
                std::swap(sortedArray[oddIndex], sortedArray[oddIndex + 1]); // @step:swap
                sorted = false;
            }
        }

        // Even phase: compare pairs at (0,1), (2,3), (4,5), ...
        // @step:even-phase
        for (int evenIndex = 0; evenIndex < arrayLength - 1; evenIndex += 2) {
            // @step:compare
            if (sortedArray[evenIndex] > sortedArray[evenIndex + 1]) {
                // @step:swap
                std::swap(sortedArray[evenIndex], sortedArray[evenIndex + 1]); // @step:swap
                sorted = false;
            }
        }
    }

    // All elements are in their sorted positions
    // @step:mark-sorted

    return sortedArray; // @step:complete
}
