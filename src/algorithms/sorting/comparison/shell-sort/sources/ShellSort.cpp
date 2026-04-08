// Shell Sort — generalized insertion sort with decreasing gap sequence
#include <vector>

std::vector<int> shellSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    // Start with half the array length and halve the gap each pass
    for (int gapSize = arrayLength / 2; gapSize > 0; gapSize /= 2) {
        // @step:gap-update

        // Perform a gapped insertion sort for this gap size
        for (int outerIndex = gapSize; outerIndex < arrayLength; outerIndex++) {
            // @step:compare
            int currentValue = sortedArray[outerIndex]; // @step:compare
            int innerIndex = outerIndex; // @step:compare

            // Shift elements that are larger than currentValue by gapSize positions
            while (innerIndex >= gapSize && sortedArray[innerIndex - gapSize] > currentValue) {
                // @step:compare
                sortedArray[innerIndex] = sortedArray[innerIndex - gapSize]; // @step:swap
                innerIndex -= gapSize; // @step:swap
            }

            // Place currentValue in its gap-relative sorted position
            sortedArray[innerIndex] = currentValue; // @step:swap
        }

        // When gap reduces to 1 the final pass is a standard insertion sort
        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
