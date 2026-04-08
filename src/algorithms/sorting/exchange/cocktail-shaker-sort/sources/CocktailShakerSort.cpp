// Cocktail Shaker Sort — bidirectional bubble sort sweeping left-to-right then right-to-left
#include <vector>
#include <algorithm>

std::vector<int> cocktailShakerSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    int leftBound = 0; // @step:initialize
    int rightBound = arrayLength - 1; // @step:initialize
    bool swapped = true; // @step:initialize

    while (swapped) {
        swapped = false;

        // Forward pass: left to right — bubble largest unsorted element to rightBound
        // @step:forward-pass
        for (int forwardIndex = leftBound; forwardIndex < rightBound; forwardIndex++) {
            // @step:compare
            if (sortedArray[forwardIndex] > sortedArray[forwardIndex + 1]) {
                // @step:swap
                std::swap(sortedArray[forwardIndex], sortedArray[forwardIndex + 1]); // @step:swap
                swapped = true; // @step:swap
            }
        }

        // The rightmost unsorted element is now sorted
        // @step:mark-sorted
        rightBound--;

        if (!swapped) break;
        swapped = false;

        // Backward pass: right to left — bubble smallest unsorted element to leftBound
        // @step:backward-pass
        for (int backwardIndex = rightBound; backwardIndex > leftBound; backwardIndex--) {
            // @step:compare
            if (sortedArray[backwardIndex - 1] > sortedArray[backwardIndex]) {
                // @step:swap
                std::swap(sortedArray[backwardIndex], sortedArray[backwardIndex - 1]); // @step:swap
                swapped = true; // @step:swap
            }
        }

        // The leftmost unsorted element is now sorted
        // @step:mark-sorted
        leftBound++;
    }

    return sortedArray; // @step:complete
}
