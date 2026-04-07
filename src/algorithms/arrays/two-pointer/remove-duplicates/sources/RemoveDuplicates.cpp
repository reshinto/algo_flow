// Remove Duplicates from Sorted Array — O(n) two-pointer: write pointer tracks unique boundary
#include <vector>
#include <utility>

std::pair<int, std::vector<int>> removeDuplicates(std::vector<int> sortedArray) {
    if (sortedArray.empty()) {
        // @step:initialize
        return {0, {}}; // @step:initialize
    }

    std::vector<int> result = sortedArray;
    int writePointer = 0; // @step:initialize

    for (int readPointer = 1; readPointer < (int)result.size(); readPointer++) {
        if (result[readPointer] != result[writePointer]) { // @step:compare
            writePointer++; // @step:swap
            result[writePointer] = result[readPointer]; // @step:swap
        }
    }

    int uniqueCount = writePointer + 1;
    return {uniqueCount, std::vector<int>(result.begin(), result.begin() + uniqueCount)}; // @step:complete
}
