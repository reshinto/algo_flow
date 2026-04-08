// Merge Sort — divide array in half recursively, then merge sorted halves
#include <vector>

void mergeSortRecursive(std::vector<int>& arr, int leftStart, int rightEnd) {
    // @step:divide
    if (rightEnd - leftStart <= 1) return; // @step:divide

    int midPoint = (leftStart + rightEnd) / 2; // @step:divide

    mergeSortRecursive(arr, leftStart, midPoint); // @step:divide
    mergeSortRecursive(arr, midPoint, rightEnd); // @step:divide

    // Merge the two sorted halves
    std::vector<int> leftHalf(arr.begin() + leftStart, arr.begin() + midPoint); // @step:merge
    std::vector<int> rightHalf(arr.begin() + midPoint, arr.begin() + rightEnd); // @step:merge

    int leftIndex = 0; // @step:merge
    int rightIndex = 0; // @step:merge
    int mergePosition = leftStart; // @step:merge

    while (leftIndex < (int)leftHalf.size() && rightIndex < (int)rightHalf.size()) {
        // @step:compare
        if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
            // @step:compare
            arr[mergePosition] = leftHalf[leftIndex]; // @step:swap
            leftIndex++; // @step:swap
        } else {
            arr[mergePosition] = rightHalf[rightIndex]; // @step:swap
            rightIndex++; // @step:swap
        }
        mergePosition++; // @step:swap
    }

    while (leftIndex < (int)leftHalf.size()) {
        // @step:merge
        arr[mergePosition] = leftHalf[leftIndex]; // @step:merge
        leftIndex++; // @step:merge
        mergePosition++; // @step:merge
    }

    while (rightIndex < (int)rightHalf.size()) {
        // @step:merge
        arr[mergePosition] = rightHalf[rightIndex]; // @step:merge
        rightIndex++; // @step:merge
        mergePosition++; // @step:merge
    }
}

std::vector<int> mergeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    mergeSortRecursive(sortedArray, 0, arrayLength); // @step:divide

    return sortedArray; // @step:complete
}
