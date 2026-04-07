// Stooge Sort — recursive: swap first/last if needed, sort first 2/3, last 2/3, first 2/3 again
#include <vector>

void stoogeSortRange(std::vector<int>& sortedArray, int startIndex, int endIndex) {
    if (startIndex >= endIndex) return;

    // @step:compare
    if (sortedArray[startIndex] > sortedArray[endIndex]) {
        // @step:swap
        int temporaryValue = sortedArray[startIndex]; // @step:swap
        sortedArray[startIndex] = sortedArray[endIndex]; // @step:swap
        sortedArray[endIndex] = temporaryValue; // @step:swap
    }

    int rangeLength = endIndex - startIndex + 1;
    if (rangeLength > 2) {
        int thirdLength = rangeLength / 3;

        stoogeSortRange(sortedArray, startIndex, endIndex - thirdLength); // Sort first 2/3
        stoogeSortRange(sortedArray, startIndex + thirdLength, endIndex); // Sort last 2/3
        stoogeSortRange(sortedArray, startIndex, endIndex - thirdLength); // Sort first 2/3 again
    }
}

std::vector<int> stoogeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize

    stoogeSortRange(sortedArray, 0, sortedArray.size() - 1);

    // @step:mark-sorted

    return sortedArray; // @step:complete
}
