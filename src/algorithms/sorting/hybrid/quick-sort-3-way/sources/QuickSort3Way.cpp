// Quick Sort 3-Way — Dutch National Flag partitioning: < pivot | = pivot | > pivot
#include <vector>
#include <algorithm>

void partition3Way(std::vector<int>& sortedArray, int low, int high) {
    if (low >= high) return; // @step:partition

    int pivotValue = sortedArray[low]; // @step:partition
    int lessThanPointer = low; // @step:partition
    int greaterThanPointer = high; // @step:partition
    int currentPointer = low; // @step:partition

    // Dutch National Flag partitioning
    while (currentPointer <= greaterThanPointer) {
        // @step:compare
        if (sortedArray[currentPointer] < pivotValue) {
            // @step:compare
            std::swap(sortedArray[lessThanPointer], sortedArray[currentPointer]); // @step:swap
            lessThanPointer++; // @step:swap
            currentPointer++; // @step:swap
        } else if (sortedArray[currentPointer] > pivotValue) {
            // @step:compare
            std::swap(sortedArray[greaterThanPointer], sortedArray[currentPointer]); // @step:swap
            greaterThanPointer--; // @step:swap
            // Do not advance currentPointer — recheck the swapped element
        } else {
            currentPointer++; // @step:compare
        }
    }

    // Elements at [lessThanPointer..greaterThanPointer] are equal to pivot — mark as placed
    // @step:pivot-placed

    // Recursively sort the less-than and greater-than partitions
    partition3Way(sortedArray, low, lessThanPointer - 1); // @step:mark-sorted
    partition3Way(sortedArray, greaterThanPointer + 1, high); // @step:mark-sorted
}

std::vector<int> quickSort3Way(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize

    if ((int)sortedArray.size() > 1) {
        partition3Way(sortedArray, 0, sortedArray.size() - 1);
    }

    return sortedArray; // @step:complete
}
