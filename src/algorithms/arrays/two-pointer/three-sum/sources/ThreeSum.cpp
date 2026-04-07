// Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
#include <vector>
#include <algorithm>

std::vector<std::vector<int>> threeSum(std::vector<int> inputArray) {
    std::sort(inputArray.begin(), inputArray.end()); // @step:initialize
    int arrayLength = (int)inputArray.size(); // @step:initialize
    std::vector<std::vector<int>> triplets; // @step:initialize

    for (int anchorIndex = 0; anchorIndex < arrayLength - 2; anchorIndex++) { // @step:visit
        // Skip duplicate anchor values to avoid duplicate triplets
        if (anchorIndex > 0 && inputArray[anchorIndex] == inputArray[anchorIndex - 1]) { // @step:compare
            continue; // @step:compare
        }

        int leftPointer = anchorIndex + 1; // @step:visit
        int rightPointer = arrayLength - 1; // @step:visit

        while (leftPointer < rightPointer) { // @step:compare
            int currentSum = inputArray[anchorIndex] + inputArray[leftPointer] + inputArray[rightPointer]; // @step:compare

            if (currentSum == 0) { // @step:compare
                triplets.push_back({inputArray[anchorIndex], inputArray[leftPointer], inputArray[rightPointer]}); // @step:visit

                // Advance both pointers and skip duplicates
                while (leftPointer < rightPointer && inputArray[leftPointer] == inputArray[leftPointer + 1]) {
                    leftPointer++; // @step:compare
                }
                while (leftPointer < rightPointer && inputArray[rightPointer] == inputArray[rightPointer - 1]) {
                    rightPointer--; // @step:compare
                }
                leftPointer++; // @step:visit
                rightPointer--; // @step:visit
            } else if (currentSum < 0) {
                leftPointer++; // @step:visit
            } else {
                rightPointer--; // @step:visit
            }
        }
    }

    return triplets; // @step:complete
}
