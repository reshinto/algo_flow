// Rotate Array (Cyclic Replacement) — O(n) time, O(1) space via cycle-following
#include <vector>

std::vector<int> rotateArrayCyclic(std::vector<int> inputArray, int rotateCount) {
    std::vector<int> result = inputArray;
    int arrayLength = (int)result.size();

    if (arrayLength == 0) {
        return result; // @step:initialize
    }

    int effectiveRotation = rotateCount % arrayLength; // @step:initialize

    if (effectiveRotation == 0) {
        return result; // @step:initialize
    }

    int cyclesCompleted = 0; // @step:initialize
    int startIndex = 0; // @step:initialize

    // Follow each cycle: place every element at its rotated destination
    while (cyclesCompleted < arrayLength) {
        int currentIndex = startIndex; // @step:visit
        int carryValue = result[currentIndex]; // @step:visit

        // Traverse the cycle until returning to the start index
        do {
            int destinationIndex = (currentIndex + effectiveRotation) % arrayLength; // @step:compare
            int nextCarry = result[destinationIndex]; // @step:compare
            result[destinationIndex] = carryValue; // @step:swap
            carryValue = nextCarry; // @step:swap
            cyclesCompleted++; // @step:swap
            currentIndex = destinationIndex; // @step:swap
        } while (currentIndex != startIndex); // @step:compare

        startIndex++; // @step:visit
    }

    return result; // @step:complete
}
