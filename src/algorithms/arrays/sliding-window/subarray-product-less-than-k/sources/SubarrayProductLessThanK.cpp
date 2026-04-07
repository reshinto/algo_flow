// Subarray Product < K — O(n) variable sliding window counting subarrays with product below threshold
#include <vector>

int subarrayProductLessThanK(const std::vector<int>& inputArray, int threshold) {
    if (inputArray.empty() || threshold <= 1) {
        // @step:initialize
        return 0; // @step:initialize
    }

    int leftPointer = 0; // @step:initialize
    int currentProduct = 1;
    int count = 0;

    // Expand the right boundary of the window
    for (int rightPointer = 0; rightPointer < (int)inputArray.size(); rightPointer++) {
        currentProduct *= inputArray[rightPointer]; // @step:expand-window

        // Shrink from the left while product meets or exceeds threshold
        while (currentProduct >= threshold && leftPointer <= rightPointer) { // @step:compare
            currentProduct /= inputArray[leftPointer]; // @step:shrink-window
            leftPointer++; // @step:shrink-window
        }

        // Every subarray ending at rightPointer and starting anywhere in [leftPointer, rightPointer]
        count += rightPointer - leftPointer + 1; // @step:compare
    }

    return count; // @step:complete
}
