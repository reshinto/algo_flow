// Find Peak Element — binary search on slope to find a peak in O(log n)
#include <vector>

int findPeakElement(const std::vector<int>& array) {
    // @step:initialize
    int lowIndex = 0; // @step:initialize
    int highIndex = static_cast<int>(array.size()) - 1; // @step:initialize

    while (lowIndex < highIndex) {
        int midIndex = lowIndex + (highIndex - lowIndex) / 2; // @step:compare
        int midValue = array[midIndex]; // @step:compare
        int nextValue = array[midIndex + 1]; // @step:compare

        if (midValue < nextValue) {
            // @step:eliminate
            // Slope is ascending — peak must be to the right
            lowIndex = midIndex + 1; // @step:eliminate
        } else {
            // @step:eliminate
            // Slope is descending or flat — peak is at mid or to the left
            highIndex = midIndex; // @step:eliminate
        }
    }

    return lowIndex; // @step:found,complete
}
