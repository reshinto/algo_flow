// Flash Sort — classify elements into buckets by value range, permute in-place, then insertion sort
#include <vector>
#include <algorithm>
#include <cmath>

std::vector<int> flashSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    // Find min and max to determine the value range
    int minValue = sortedArray[0]; // @step:initialize
    int maxIndex = 0; // @step:initialize
    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        if (sortedArray[scanIndex] < minValue) {
            minValue = sortedArray[scanIndex]; // @step:initialize
        }
        if (sortedArray[scanIndex] > sortedArray[maxIndex]) {
            maxIndex = scanIndex; // @step:initialize
        }
    }

    if (sortedArray[maxIndex] == minValue) {
        return sortedArray; // @step:complete
    }

    // Number of classes — roughly n/5 or 1, bounded
    int classCount = std::max(1, (int)(0.45 * arrayLength)); // @step:initialize
    std::vector<int> classVector(classCount, 0); // @step:initialize
    double scaleFactor = (double)(classCount - 1) / (sortedArray[maxIndex] - minValue); // @step:initialize

    // Classify — count how many elements fall in each class
    for (int classifyIndex = 0; classifyIndex < arrayLength; classifyIndex++) {
        // @step:classify
        int classIndex = (int)(scaleFactor * (sortedArray[classifyIndex] - minValue)); // @step:classify
        classVector[classIndex]++; // @step:classify
    }

    // Compute prefix sums (class upper boundaries)
    for (int prefixIndex = 1; prefixIndex < classCount; prefixIndex++) {
        // @step:classify
        classVector[prefixIndex] += classVector[prefixIndex - 1]; // @step:classify
    }

    // Swap the maximum element to the front temporarily
    std::swap(sortedArray[0], sortedArray[maxIndex]); // @step:swap

    // Permutation phase — cycle sort within classes
    int cycleIndex = 0; // @step:swap
    int permutationsDone = 0; // @step:swap

    while (permutationsDone < arrayLength - 1) {
        // @step:swap
        while (cycleIndex >= classVector[(int)(scaleFactor * (sortedArray[cycleIndex] - minValue))] - 1) {
            // @step:compare
            cycleIndex++; // @step:compare
        }
        int holdValue = sortedArray[cycleIndex]; // @step:swap
        int targetClass = (int)(scaleFactor * (holdValue - minValue)); // @step:swap

        while (cycleIndex != classVector[targetClass] - 1) {
            // @step:swap
            targetClass = (int)(scaleFactor * (holdValue - minValue)); // @step:swap
            int targetPosition = classVector[targetClass] - 1; // @step:swap
            int flashTemp = sortedArray[targetPosition]; // @step:swap
            sortedArray[targetPosition] = holdValue; // @step:swap
            holdValue = flashTemp; // @step:swap
            classVector[targetClass]--; // @step:swap
            permutationsDone++; // @step:swap
        }
        // Place the final held value at cycleIndex to complete this cycle
        sortedArray[cycleIndex] = holdValue; // @step:swap
        permutationsDone++; // @step:swap
    }

    // Insertion sort pass to clean up small disorder within classes
    for (int outerIndex = 1; outerIndex < arrayLength; outerIndex++) {
        // @step:insertion-pass
        int currentValue = sortedArray[outerIndex]; // @step:insertion-pass
        int insertPosition = outerIndex - 1; // @step:insertion-pass

        while (insertPosition >= 0 && sortedArray[insertPosition] > currentValue) {
            // @step:compare
            sortedArray[insertPosition + 1] = sortedArray[insertPosition]; // @step:swap
            insertPosition--; // @step:swap
        }
        sortedArray[insertPosition + 1] = currentValue; // @step:mark-sorted
    }

    return sortedArray; // @step:complete
}
