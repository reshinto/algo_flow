// Rotate Array (Reversal Method) — O(n) three-reversal technique with O(1) space
#include <vector>
#include <algorithm>

std::vector<int> rotateArray(std::vector<int> inputArray, int rotateCount) {
    std::vector<int> result = inputArray;
    int arrayLength = (int)result.size();

    if (arrayLength == 0) {
        return result; // @step:initialize
    }

    int effectiveRotation = rotateCount % arrayLength; // @step:initialize

    if (effectiveRotation == 0) {
        return result; // @step:initialize
    }

    // Phase 1: reverse entire array
    int leftPointer = 0; // @step:initialize
    int rightPointer = arrayLength - 1; // @step:initialize

    while (leftPointer < rightPointer) {
        std::swap(result[leftPointer], result[rightPointer]); // @step:swap
        leftPointer++; // @step:visit
        rightPointer--; // @step:visit
    }

    // Phase 2: reverse first effectiveRotation elements
    leftPointer = 0; // @step:initialize
    rightPointer = effectiveRotation - 1; // @step:initialize

    while (leftPointer < rightPointer) {
        std::swap(result[leftPointer], result[rightPointer]); // @step:swap
        leftPointer++; // @step:visit
        rightPointer--; // @step:visit
    }

    // Phase 3: reverse remaining elements
    leftPointer = effectiveRotation; // @step:initialize
    rightPointer = arrayLength - 1; // @step:initialize

    while (leftPointer < rightPointer) {
        std::swap(result[leftPointer], result[rightPointer]); // @step:swap
        leftPointer++; // @step:visit
        rightPointer--; // @step:visit
    }

    return result; // @step:complete
}
