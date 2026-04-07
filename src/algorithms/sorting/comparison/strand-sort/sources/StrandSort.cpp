// Strand Sort — repeatedly extract sorted sublists (strands) from input and merge into output
#include <vector>

std::vector<int> mergeTwoSortedArrays(std::vector<int>& leftArray, std::vector<int>& rightArray) {
    std::vector<int> merged;
    int leftPointer = 0;
    int rightPointer = 0;

    while (leftPointer < (int)leftArray.size() && rightPointer < (int)rightArray.size()) {
        if (leftArray[leftPointer] <= rightArray[rightPointer]) {
            merged.push_back(leftArray[leftPointer++]);
        } else {
            merged.push_back(rightArray[rightPointer++]);
        }
    }

    while (leftPointer < (int)leftArray.size()) {
        merged.push_back(leftArray[leftPointer++]);
    }

    while (rightPointer < (int)rightArray.size()) {
        merged.push_back(rightArray[rightPointer++]);
    }

    return merged;
}

std::vector<int> strandSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> remainingArray = inputArray; // @step:initialize
    int arrayLength = remainingArray.size(); // @step:initialize

    if (arrayLength <= 1) return remainingArray; // @step:initialize

    std::vector<int> outputArray; // @step:initialize

    while (!remainingArray.empty()) {
        // Extract a strand: pick elements forming an ascending sequence
        std::vector<int> strand = {remainingArray[0]}; // @step:extract-strand
        std::vector<int> leftover; // @step:extract-strand

        for (int scanIndex = 1; scanIndex < (int)remainingArray.size(); scanIndex++) {
            // @step:compare
            if (remainingArray[scanIndex] >= strand.back()) {
                // @step:compare
                strand.push_back(remainingArray[scanIndex]); // @step:extract-strand
            } else {
                leftover.push_back(remainingArray[scanIndex]); // @step:extract-strand
            }
        }

        // Merge the extracted strand into the output array
        outputArray = mergeTwoSortedArrays(outputArray, strand); // @step:merge-strand

        // Update remaining to only contain elements not in strand
        remainingArray = leftover; // @step:extract-strand
    }

    // Copy the sorted output back
    for (int finalIndex = 0; finalIndex < (int)outputArray.size(); finalIndex++) {
        // @step:mark-sorted
    }

    return outputArray; // @step:complete
}
