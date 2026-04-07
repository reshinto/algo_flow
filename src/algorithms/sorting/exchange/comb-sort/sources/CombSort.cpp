// Comb Sort — improved bubble sort using a shrinking gap (factor 1.3) to eliminate turtles
#include <vector>
#include <algorithm>
#include <cmath>

std::vector<int> combSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    const double SHRINK_FACTOR = 1.3; // @step:initialize
    int gap = arrayLength; // @step:initialize
    bool sorted = false; // @step:initialize

    while (!sorted) {
        // Shrink the gap by the shrink factor
        // @step:gap-update
        gap = (int)(gap / SHRINK_FACTOR); // @step:gap-update
        if (gap <= 1) {
            gap = 1;
            sorted = true; // assume sorted until a swap proves otherwise
        }

        // Perform a pass with the current gap
        for (int startIndex = 0; startIndex + gap < arrayLength; startIndex++) {
            int compareIndex = startIndex + gap;
            // @step:compare
            if (sortedArray[startIndex] > sortedArray[compareIndex]) {
                // @step:swap
                std::swap(sortedArray[startIndex], sortedArray[compareIndex]); // @step:swap
                sorted = false; // a swap occurred — need another pass
            }
        }
    }

    // All elements are now in their sorted positions
    // @step:mark-sorted

    return sortedArray; // @step:complete
}
