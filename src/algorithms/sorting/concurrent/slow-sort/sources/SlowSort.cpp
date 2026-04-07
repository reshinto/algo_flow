// Slow Sort — multiply-and-surrender: recursively find max of halves, swap to end, sort remainder
#include <vector>

void slowSortRange(std::vector<int>& sortedArray, int startIndex, int endIndex) {
    if (startIndex >= endIndex) return;

    int midIndex = (startIndex + endIndex) / 2;

    slowSortRange(sortedArray, startIndex, midIndex); // Sort first half
    slowSortRange(sortedArray, midIndex + 1, endIndex); // Sort second half

    // Find the maximum of both halves (now at their respective ends)
    // @step:compare
    if (sortedArray[midIndex] > sortedArray[endIndex]) {
        // @step:swap
        int temporaryValue = sortedArray[midIndex]; // @step:swap
        sortedArray[midIndex] = sortedArray[endIndex]; // @step:swap
        sortedArray[endIndex] = temporaryValue; // @step:swap
    }

    // The maximum is now at endIndex — recursively sort the rest
    slowSortRange(sortedArray, startIndex, endIndex - 1); // @step:mark-sorted
}

std::vector<int> slowSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize

    slowSortRange(sortedArray, 0, sortedArray.size() - 1);

    return sortedArray; // @step:complete
}
