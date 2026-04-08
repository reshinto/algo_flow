// Quick Sort (Lomuto partition) — pick last element as pivot, partition around it, recurse
#include <vector>

int partition(std::vector<int>& arr, int lowIndex, int highIndex) {
    // @step:partition
    int pivotValue = arr[highIndex]; // @step:partition
    int partitionIndex = lowIndex - 1; // @step:partition

    for (int scanIndex = lowIndex; scanIndex < highIndex; scanIndex++) {
        // @step:compare
        if (arr[scanIndex] <= pivotValue) {
            // @step:compare
            partitionIndex++; // @step:swap
            int temporaryValue = arr[partitionIndex]; // @step:swap
            arr[partitionIndex] = arr[scanIndex]; // @step:swap
            arr[scanIndex] = temporaryValue; // @step:swap
        }
    }

    // Place pivot in its final sorted position
    int temporaryValue = arr[partitionIndex + 1]; // @step:pivot-placed
    arr[partitionIndex + 1] = arr[highIndex]; // @step:pivot-placed
    arr[highIndex] = temporaryValue; // @step:pivot-placed

    return partitionIndex + 1; // @step:pivot-placed
}

void quickSortRecursive(std::vector<int>& arr, int lowIndex, int highIndex) {
    // @step:partition
    if (lowIndex >= highIndex) return; // @step:partition

    int pivotFinalIndex = partition(arr, lowIndex, highIndex); // @step:pivot-placed

    quickSortRecursive(arr, lowIndex, pivotFinalIndex - 1); // @step:partition
    quickSortRecursive(arr, pivotFinalIndex + 1, highIndex); // @step:partition
}

std::vector<int> quickSortLomuto(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    quickSortRecursive(sortedArray, 0, arrayLength - 1); // @step:partition

    return sortedArray; // @step:complete
}
