// Pancake Sort — find max in unsorted portion, flip to front, flip to end
// A flip reverses the subarray from index 0 to flipIndex (inclusive) via adjacent swaps
#include <vector>
#include <algorithm>

std::vector<int> pancakeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    for (int unsortedSize = arrayLength; unsortedSize > 1; unsortedSize--) {
        // Find the index of the maximum element in the unsorted portion
        // @step:find-max
        int maxIndex = 0; // @step:find-max
        for (int searchIndex = 1; searchIndex < unsortedSize; searchIndex++) {
            // @step:compare
            if (sortedArray[searchIndex] > sortedArray[maxIndex]) {
                maxIndex = searchIndex; // @step:compare
            }
        }

        // If the max is not already at the end, flip it there
        if (maxIndex != unsortedSize - 1) {
            // Flip max to front if not already there
            if (maxIndex != 0) {
                // @step:flip
                int flipLeft = 0; // @step:flip
                int flipRight = maxIndex; // @step:flip
                while (flipLeft < flipRight) {
                    // @step:swap
                    std::swap(sortedArray[flipLeft], sortedArray[flipRight]); // @step:swap
                    flipLeft++;
                    flipRight--;
                }
            }

            // Flip front to end of unsorted portion
            // @step:flip
            int flipLeft = 0; // @step:flip
            int flipRight = unsortedSize - 1; // @step:flip
            while (flipLeft < flipRight) {
                // @step:swap
                std::swap(sortedArray[flipLeft], sortedArray[flipRight]); // @step:swap
                flipLeft++;
                flipRight--;
            }
        }

        // The element at unsortedSize - 1 is now in its sorted position
        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
