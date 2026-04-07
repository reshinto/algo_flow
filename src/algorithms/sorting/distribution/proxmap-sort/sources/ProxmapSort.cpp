// Proxmap Sort — proximity map sorting: map each element to its approximate final position, then insertion sort locally
#include <vector>
#include <algorithm>
#include <cmath>

std::vector<int> proxmapSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sourceArray = inputArray; // @step:initialize
    int arrayLength = sourceArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sourceArray; // @step:complete
    }

    int minValue = *std::min_element(sourceArray.begin(), sourceArray.end()); // @step:initialize
    int maxValue = *std::max_element(sourceArray.begin(), sourceArray.end()); // @step:initialize

    if (minValue == maxValue) {
        return sourceArray; // @step:complete
    }

    double valueRange = (double)(maxValue - minValue); // @step:initialize
    double scaleFactor = (arrayLength - 1.0) / valueRange; // @step:initialize

    // Build proxmap — count how many elements map to each position
    std::vector<int> hitCount(arrayLength, 0); // @step:map-position
    for (int mapIndex = 0; mapIndex < arrayLength; mapIndex++) {
        // @step:map-position
        int mappedPosition = (int)(scaleFactor * (sourceArray[mapIndex] - minValue)); // @step:map-position
        hitCount[mappedPosition]++; // @step:map-position
    }

    // Compute starting positions for each cluster (prefix sums)
    std::vector<int> startPosition(arrayLength, 0); // @step:map-position
    int runningTotal = 0; // @step:map-position
    for (int posIndex = 0; posIndex < arrayLength; posIndex++) {
        // @step:map-position
        startPosition[posIndex] = runningTotal; // @step:map-position
        runningTotal += hitCount[posIndex]; // @step:map-position
    }

    // Insert each element into the output array near its mapped position
    std::vector<int> outputArray(arrayLength, 0); // @step:compare
    std::vector<int> nextSlot = startPosition; // @step:compare

    for (int insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
        // @step:compare
        int currentValue = sourceArray[insertIndex]; // @step:compare
        int mappedPosition = (int)(scaleFactor * (currentValue - minValue)); // @step:compare
        int slotIndex = nextSlot[mappedPosition]; // @step:compare

        // Insertion sort within the cluster to maintain order
        while (slotIndex > startPosition[mappedPosition] && outputArray[slotIndex - 1] > currentValue) {
            // @step:compare
            outputArray[slotIndex] = outputArray[slotIndex - 1]; // @step:swap
            slotIndex--; // @step:swap
        }
        outputArray[slotIndex] = currentValue; // @step:swap
        nextSlot[mappedPosition]++; // @step:swap
    }

    // Copy sorted output back to source array
    for (int copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
        sourceArray[copyIndex] = outputArray[copyIndex]; // @step:mark-sorted
    }

    return sourceArray; // @step:complete
}
