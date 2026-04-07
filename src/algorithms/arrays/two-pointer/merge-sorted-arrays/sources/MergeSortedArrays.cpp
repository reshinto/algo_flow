// Merge Two Sorted Arrays — O(n+m) merge using two pointers
#include <vector>

std::vector<int> mergeSortedArrays(const std::vector<int>& firstArray, const std::vector<int>& secondArray) {
    std::vector<int> merged; // @step:initialize
    int firstPointer = 0; // @step:initialize
    int secondPointer = 0; // @step:initialize

    // Compare front elements from each array, place the smaller into result
    while (firstPointer < (int)firstArray.size() && secondPointer < (int)secondArray.size()) {
        if (firstArray[firstPointer] <= secondArray[secondPointer]) { // @step:compare
            merged.push_back(firstArray[firstPointer]); // @step:visit
            firstPointer++; // @step:visit
        } else {
            merged.push_back(secondArray[secondPointer]); // @step:visit
            secondPointer++; // @step:visit
        }
    }

    // Drain remaining elements from whichever array has leftovers
    while (firstPointer < (int)firstArray.size()) {
        merged.push_back(firstArray[firstPointer]); // @step:visit
        firstPointer++; // @step:visit
    }
    while (secondPointer < (int)secondArray.size()) {
        merged.push_back(secondArray[secondPointer]); // @step:visit
        secondPointer++; // @step:visit
    }

    return merged; // @step:complete
}
