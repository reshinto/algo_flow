// Merge Insertion Sort (Ford-Johnson) — theoretically optimal comparisons; pair elements, sort larger half recursively, binary-insert smaller half
#include <vector>

int binarySearchInsertionPoint(int targetValue, std::vector<int>& searchArray, int leftBound, int rightBound) {
    // @step:binary-insert
    int low = leftBound;
    int high = rightBound;

    while (low < high) {
        int midPoint = (low + high) / 2; // @step:binary-insert
        if (searchArray[midPoint] < targetValue) {
            // @step:binary-insert
            low = midPoint + 1;
        } else {
            high = midPoint;
        }
    }
    return low; // @step:binary-insert
}

void insertAt(std::vector<int>& sortedArray, int targetValue, int insertionIndex, int endIndex) {
    // @step:binary-insert
    for (int shiftIndex = endIndex; shiftIndex > insertionIndex; shiftIndex--) {
        sortedArray[shiftIndex] = sortedArray[shiftIndex - 1]; // @step:swap
    }
    sortedArray[insertionIndex] = targetValue; // @step:binary-insert
}

std::vector<int> mergeInsertionSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) return sortedArray; // @step:initialize

    // Step 1: Pair elements and compare each pair to identify larger and smaller elements
    int pairCount = arrayLength / 2;
    bool hasUnpaired = arrayLength % 2 == 1;

    // Sort within each pair so sortedArray[2k] >= sortedArray[2k+1]
    for (int pairIndex = 0; pairIndex < pairCount; pairIndex++) {
        // @step:pair
        int leftPos = pairIndex * 2; // @step:compare
        int rightPos = leftPos + 1; // @step:compare

        if (sortedArray[leftPos] < sortedArray[rightPos]) {
            // @step:compare
            int temporaryValue = sortedArray[leftPos]; // @step:swap
            sortedArray[leftPos] = sortedArray[rightPos]; // @step:swap
            sortedArray[rightPos] = temporaryValue; // @step:swap
        }
    }

    // Step 2: Extract the larger elements (at even indices) and sort them
    std::vector<int> largerElements;
    std::vector<int> smallerElements;

    for (int pairIndex = 0; pairIndex < pairCount; pairIndex++) {
        largerElements.push_back(sortedArray[pairIndex * 2]); // @step:pair
        smallerElements.push_back(sortedArray[pairIndex * 2 + 1]); // @step:pair
    }
    if (hasUnpaired) {
        smallerElements.push_back(sortedArray[arrayLength - 1]); // @step:pair
    }

    // Recursively sort the larger elements using insertion sort
    for (int insertIndex = 1; insertIndex < (int)largerElements.size(); insertIndex++) {
        int currentValue = largerElements[insertIndex]; // @step:compare
        int innerIndex = insertIndex - 1;

        while (innerIndex >= 0 && largerElements[innerIndex] > currentValue) {
            // @step:compare
            largerElements[innerIndex + 1] = largerElements[innerIndex]; // @step:swap
            innerIndex--;
        }
        largerElements[innerIndex + 1] = currentValue; // @step:binary-insert
    }

    // Step 3: Build the initial sorted sequence from larger elements
    int resultLength = largerElements.size();
    for (int resultIndex = 0; resultIndex < resultLength; resultIndex++) {
        sortedArray[resultIndex] = largerElements[resultIndex]; // @step:binary-insert
    }

    int insertedCount = resultLength;

    // Insert the smaller elements using binary insertion
    for (int smallerIndex = 0; smallerIndex < (int)smallerElements.size(); smallerIndex++) {
        int valueToInsert = smallerElements[smallerIndex]; // @step:binary-insert
        int searchBound = insertedCount; // @step:binary-insert

        int insertionPosition = binarySearchInsertionPoint(valueToInsert, sortedArray, 0, searchBound); // @step:compare

        insertAt(sortedArray, valueToInsert, insertionPosition, insertedCount); // @step:binary-insert
        insertedCount++;
    }

    // @step:mark-sorted

    return sortedArray; // @step:complete
}
