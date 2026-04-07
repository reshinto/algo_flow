// Bubble Sort — repeatedly swap adjacent out-of-order elements
#include <vector>

std::vector<int> bubbleSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
        // @step:outer-loop,mark-sorted
        bool swappedThisPass = false; // @step:outer-loop

        // Each pass bubbles the next-largest element into its final position
        for (int innerIndex = 0; innerIndex < arrayLength - 1 - outerIndex; innerIndex++) {
            // @step:inner-loop
            if (sortedArray[innerIndex] > sortedArray[innerIndex + 1]) {
                // @step:compare
                int temporaryValue = sortedArray[innerIndex]; // @step:swap
                sortedArray[innerIndex] = sortedArray[innerIndex + 1]; // @step:swap
                sortedArray[innerIndex + 1] = temporaryValue; // @step:swap
                swappedThisPass = true; // @step:swap
            }
        }

        // No swaps means the array is already sorted — exit early for O(n) best case
        if (!swappedThisPass) break; // @step:early-exit
    }

    return sortedArray; // @step:complete
}
