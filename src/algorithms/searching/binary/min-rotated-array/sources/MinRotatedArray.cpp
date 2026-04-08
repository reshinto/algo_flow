// Minimum in Rotated Sorted Array — binary search variant finding the rotation pivot
#include <vector>

int minRotatedArray(const std::vector<int>& sortedArray) {
    // @step:initialize
    int lowIndex = 0; // @step:initialize
    int highIndex = static_cast<int>(sortedArray.size()) - 1; // @step:initialize

    while (lowIndex < highIndex) {
        int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int midValue = sortedArray[midIndex]; // @step:compare
        int highValue = sortedArray[highIndex]; // @step:compare

        if (midValue > highValue) {
            // @step:compare,eliminate
            // Minimum is in the right half — discard left including mid
            lowIndex = midIndex + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Minimum is in the left half or at mid — discard right
            highIndex = midIndex; // @step:eliminate
        }
    }

    return sortedArray[lowIndex]; // @step:found,complete
}
