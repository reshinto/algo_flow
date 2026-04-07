// Dual-Pivot Quick Sort — two pivots create three partitions: < pivot1 | pivot1..pivot2 | > pivot2
#include <vector>
#include <algorithm>

void partition(std::vector<int>& sortedArray, int low, int high) {
    if (low >= high) return; // @step:partition

    // Ensure pivot1 <= pivot2
    if (sortedArray[low] > sortedArray[high]) {
        // @step:partition
        std::swap(sortedArray[low], sortedArray[high]); // @step:partition
    }

    int pivot1 = sortedArray[low]; // @step:partition
    int pivot2 = sortedArray[high]; // @step:partition

    int lessThanPointer = low + 1; // @step:partition
    int greaterThanPointer = high - 1; // @step:partition
    int currentPointer = low + 1; // @step:partition

    while (currentPointer <= greaterThanPointer) {
        // @step:compare
        if (sortedArray[currentPointer] < pivot1) {
            // @step:compare
            std::swap(sortedArray[lessThanPointer], sortedArray[currentPointer]); // @step:swap
            lessThanPointer++; // @step:swap
            currentPointer++; // @step:swap
        } else if (sortedArray[currentPointer] > pivot2) {
            // @step:compare
            // Find the rightmost non-greater element
            while (greaterThanPointer > currentPointer && sortedArray[greaterThanPointer] > pivot2) {
                // @step:compare
                greaterThanPointer--; // @step:compare
            }
            std::swap(sortedArray[greaterThanPointer], sortedArray[currentPointer]); // @step:swap
            greaterThanPointer--; // @step:swap
            // Recheck currentPointer
        } else {
            currentPointer++; // @step:compare
        }
    }

    // Place pivot1 and pivot2 in their final positions
    lessThanPointer--; // @step:pivot-placed
    greaterThanPointer++; // @step:pivot-placed

    std::swap(sortedArray[low], sortedArray[lessThanPointer]); // @step:pivot-placed
    std::swap(sortedArray[high], sortedArray[greaterThanPointer]); // @step:pivot-placed

    // Both pivots are now at their final sorted positions
    // @step:mark-sorted

    // Recursively sort three partitions
    partition(sortedArray, low, lessThanPointer - 1); // @step:mark-sorted
    partition(sortedArray, lessThanPointer + 1, greaterThanPointer - 1); // @step:mark-sorted
    partition(sortedArray, greaterThanPointer + 1, high); // @step:mark-sorted
}

std::vector<int> dualPivotQuickSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize

    if ((int)sortedArray.size() > 1) {
        partition(sortedArray, 0, sortedArray.size() - 1);
    }

    return sortedArray; // @step:complete
}
