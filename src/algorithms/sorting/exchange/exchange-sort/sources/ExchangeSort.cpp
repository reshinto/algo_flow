// Exchange Sort — for each element, compare with all subsequent elements and swap if out of order
#include <vector>
#include <algorithm>

std::vector<int> exchangeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    for (int outerIndex = 0; outerIndex < arrayLength - 1; outerIndex++) {
        for (int innerIndex = outerIndex + 1; innerIndex < arrayLength; innerIndex++) {
            // @step:compare
            if (sortedArray[outerIndex] > sortedArray[innerIndex]) {
                // @step:swap
                std::swap(sortedArray[outerIndex], sortedArray[innerIndex]); // @step:swap
            }
        }

        // The element at outerIndex is now in its final sorted position
        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
