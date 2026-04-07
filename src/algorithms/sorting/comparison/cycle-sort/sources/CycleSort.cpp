// Cycle Sort — for each element, count elements smaller than it to find its correct position;
// place it there. Minimizes the number of writes to the array.
#include <vector>

std::vector<int> cycleSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    for (int cycleStart = 0; cycleStart < arrayLength - 1; cycleStart++) {
        // @step:count-position
        int currentValue = sortedArray[cycleStart]; // @step:count-position

        // Find the correct position for currentValue
        int correctPosition = cycleStart; // @step:count-position
        for (int scanIndex = cycleStart + 1; scanIndex < arrayLength; scanIndex++) {
            // @step:compare
            if (sortedArray[scanIndex] < currentValue) {
                // @step:compare
                correctPosition++; // @step:count-position
            }
        }

        // If the item is already in the correct position, skip this cycle
        if (correctPosition == cycleStart) continue; // @step:count-position

        // Skip over duplicates to find the unique insertion point
        while (currentValue == sortedArray[correctPosition]) {
            // @step:count-position
            correctPosition++; // @step:count-position
        }

        // Place currentValue at its correct position
        int displacedValue = sortedArray[correctPosition]; // @step:swap
        sortedArray[correctPosition] = currentValue; // @step:swap
        currentValue = displacedValue; // @step:swap

        // Rotate the rest of the cycle
        while (correctPosition != cycleStart) {
            // @step:count-position
            correctPosition = cycleStart; // @step:count-position

            for (int scanIndex = cycleStart + 1; scanIndex < arrayLength; scanIndex++) {
                // @step:compare
                if (sortedArray[scanIndex] < currentValue) {
                    // @step:compare
                    correctPosition++; // @step:count-position
                }
            }

            while (currentValue == sortedArray[correctPosition]) {
                // @step:count-position
                correctPosition++; // @step:count-position
            }

            if (currentValue != sortedArray[correctPosition]) {
                // @step:swap
                int nextDisplacedValue = sortedArray[correctPosition]; // @step:swap
                sortedArray[correctPosition] = currentValue; // @step:swap
                currentValue = nextDisplacedValue; // @step:swap
            }
        }

        // @step:mark-sorted
    }

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
