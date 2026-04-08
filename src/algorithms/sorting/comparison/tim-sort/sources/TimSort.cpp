// Tim Sort — hybrid of insertion sort for small runs + merge sort to combine them
#include <vector>
#include <algorithm>

const int MIN_RUN_SIZE = 4;

void insertionSortRun(std::vector<int>& sortedArray, int runStart, int runEnd) {
    // @step:insertion-pass
    for (int outerIndex = runStart + 1; outerIndex <= runEnd; outerIndex++) {
        // @step:insertion-pass
        int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
        int innerIndex = outerIndex - 1; // @step:insertion-pass

        while (innerIndex >= runStart && sortedArray[innerIndex] > currentValue) {
            // @step:compare
            sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
            innerIndex--; // @step:swap
        }
        sortedArray[innerIndex + 1] = currentValue; // @step:swap
    }
}

void mergeRuns(std::vector<int>& sortedArray, int leftStart, int midPoint, int rightEnd) {
    // @step:merge
    std::vector<int> leftSlice(sortedArray.begin() + leftStart, sortedArray.begin() + midPoint + 1); // @step:merge
    std::vector<int> rightSlice(sortedArray.begin() + midPoint + 1, sortedArray.begin() + rightEnd + 1); // @step:merge

    int leftPointer = 0; // @step:merge
    int rightPointer = 0; // @step:merge
    int mergeIndex = leftStart; // @step:merge

    while (leftPointer < (int)leftSlice.size() && rightPointer < (int)rightSlice.size()) {
        // @step:compare
        if (leftSlice[leftPointer] <= rightSlice[rightPointer]) {
            // @step:compare
            sortedArray[mergeIndex] = leftSlice[leftPointer]; // @step:merge
            leftPointer++; // @step:merge
        } else {
            sortedArray[mergeIndex] = rightSlice[rightPointer]; // @step:merge
            rightPointer++; // @step:merge
        }
        mergeIndex++; // @step:merge
    }

    while (leftPointer < (int)leftSlice.size()) {
        sortedArray[mergeIndex] = leftSlice[leftPointer]; // @step:merge
        leftPointer++; // @step:merge
        mergeIndex++; // @step:merge
    }

    while (rightPointer < (int)rightSlice.size()) {
        sortedArray[mergeIndex] = rightSlice[rightPointer]; // @step:merge
        rightPointer++; // @step:merge
        mergeIndex++; // @step:merge
    }
}

std::vector<int> timSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    // Sort individual runs using insertion sort
    for (int runStart = 0; runStart < arrayLength; runStart += MIN_RUN_SIZE) {
        // @step:insertion-pass
        int runEnd = std::min(runStart + MIN_RUN_SIZE - 1, arrayLength - 1); // @step:insertion-pass
        insertionSortRun(sortedArray, runStart, runEnd); // @step:insertion-pass
    }

    // Merge sorted runs in increasing size
    for (int mergeSize = MIN_RUN_SIZE; mergeSize < arrayLength; mergeSize *= 2) {
        // @step:merge
        for (int leftStart = 0; leftStart < arrayLength; leftStart += 2 * mergeSize) {
            // @step:merge
            int midPoint = std::min(leftStart + mergeSize - 1, arrayLength - 1); // @step:merge
            int rightEnd = std::min(leftStart + 2 * mergeSize - 1, arrayLength - 1); // @step:merge

            if (midPoint < rightEnd) {
                mergeRuns(sortedArray, leftStart, midPoint, rightEnd); // @step:merge
            }
        }
    }

    // @step:mark-sorted
    return sortedArray; // @step:complete
}
