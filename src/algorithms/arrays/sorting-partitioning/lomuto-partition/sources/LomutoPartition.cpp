// Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
#include <vector>
#include <utility>
#include <algorithm>

std::pair<int, std::vector<int>> lomutoPartition(std::vector<int> inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {-1, {}}; // @step:initialize
    }

    std::vector<int> result = inputArray; // @step:initialize
    int pivotOriginalIndex = (int)result.size() - 1;
    int pivotValue = result[pivotOriginalIndex]; // @step:initialize
    int boundaryIndex = 0; // @step:initialize

    for (int scanIndex = 0; scanIndex < pivotOriginalIndex; scanIndex++) { // @step:visit
        if (result[scanIndex] <= pivotValue) { // @step:compare
            std::swap(result[boundaryIndex], result[scanIndex]); // @step:swap
            boundaryIndex++; // @step:visit
        }
    }

    // Place pivot into its final sorted position
    std::swap(result[boundaryIndex], result[pivotOriginalIndex]); // @step:swap

    return {boundaryIndex, result}; // @step:complete
}
