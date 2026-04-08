// Block Merge Sort (simplified GrailSort) — find natural runs, merge in-place via rotation
#include <vector>
#include <algorithm>

std::vector<int> blockMergeSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    if (arrayLength <= 1) return sortedArray; // @step:initialize

    // Find natural ascending runs in the array
    // @step:find-runs
    std::vector<int> runBoundaries = {0}; // @step:find-runs
    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        // @step:compare
        if (sortedArray[scanIndex] < sortedArray[scanIndex - 1]) {
            // @step:compare
            runBoundaries.push_back(scanIndex); // @step:find-runs
        }
    }
    runBoundaries.push_back(arrayLength); // @step:find-runs

    // Merge runs pairwise until one run covers the full array
    while ((int)runBoundaries.size() > 2) {
        std::vector<int> nextBoundaries = {0}; // @step:merge

        for (int boundaryIndex = 0; boundaryIndex + 2 <= (int)runBoundaries.size() - 1; boundaryIndex += 2) {
            int leftStart = runBoundaries[boundaryIndex]; // @step:merge
            int rightStart = runBoundaries[boundaryIndex + 1]; // @step:merge
            int mergeEnd = runBoundaries[boundaryIndex + 2]; // @step:merge

            // In-place merge using rotation
            int leftPointer = leftStart; // @step:compare
            int rightPointer = rightStart; // @step:compare

            while (leftPointer < rightPointer && rightPointer < mergeEnd) {
                // @step:compare
                if (sortedArray[leftPointer] <= sortedArray[rightPointer]) {
                    // @step:compare
                    leftPointer++; // @step:compare
                } else {
                    // Rotate the element from rightPointer into the correct position
                    int displacedValue = sortedArray[rightPointer]; // @step:rotate

                    // Shift elements from leftPointer to rightPointer-1 one position right
                    for (int shiftIndex = rightPointer; shiftIndex > leftPointer; shiftIndex--) {
                        // @step:swap
                        sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]; // @step:swap
                    }
                    sortedArray[leftPointer] = displacedValue; // @step:swap
                    leftPointer++; // @step:swap
                    rightPointer++; // @step:swap
                }
            }

            nextBoundaries.push_back(mergeEnd); // @step:merge
        }

        // If there is an odd run left, carry its end boundary over unchanged
        if ((runBoundaries.size() - 1) % 2 == 1) {
            nextBoundaries.push_back(arrayLength); // @step:merge
        }

        runBoundaries = nextBoundaries; // @step:merge

        // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
