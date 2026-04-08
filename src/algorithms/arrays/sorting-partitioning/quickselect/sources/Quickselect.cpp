// Quickselect — O(n) average via Lomuto partition, recurse only on relevant half
#include <vector>
#include <utility>
#include <algorithm>

static int lomutoPartitionRange(std::vector<int>& array, int rangeStart, int rangeEnd) {
    int pivotValue = array[rangeEnd]; // @step:compare
    int boundaryIndex = rangeStart;

    for (int scanIndex = rangeStart; scanIndex < rangeEnd; scanIndex++) {
        if (array[scanIndex] <= pivotValue) { // @step:compare
            std::swap(array[boundaryIndex], array[scanIndex]); // @step:swap
            boundaryIndex++;
        }
    }

    std::swap(array[boundaryIndex], array[rangeEnd]); // @step:swap
    return boundaryIndex;
}

static int selectKth(std::vector<int>& array, int rangeStart, int rangeEnd, int targetPosition) {
    if (rangeStart == rangeEnd) { // @step:compare
        return array[rangeStart]; // @step:compare
    }

    int pivotFinalIndex = lomutoPartitionRange(array, rangeStart, rangeEnd); // @step:compare

    if (pivotFinalIndex == targetPosition) { // @step:compare
        return array[pivotFinalIndex]; // @step:compare
    } else if (targetPosition < pivotFinalIndex) {
        return selectKth(array, rangeStart, pivotFinalIndex - 1, targetPosition); // @step:compare
    } else {
        return selectKth(array, pivotFinalIndex + 1, rangeEnd, targetPosition); // @step:compare
    }
}

std::pair<int, int> quickselect(std::vector<int> inputArray, int targetK) {
    if (inputArray.empty() || targetK < 1 || targetK > (int)inputArray.size()) {
        // @step:initialize
        return {-1, -1}; // @step:initialize
    }

    std::vector<int> workArray = inputArray; // @step:initialize
    int targetIndex = targetK - 1; // @step:initialize

    int kthElement = selectKth(workArray, 0, (int)workArray.size() - 1, targetIndex);
    auto pivotIt = std::find(workArray.begin(), workArray.end(), kthElement);
    int pivotIndex = (int)(pivotIt - workArray.begin());

    return {kthElement, pivotIndex}; // @step:complete
}
