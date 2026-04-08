// Stalin Sort — eliminate any element smaller than the current maximum; returns only surviving elements
#include <vector>

std::vector<int> stalinSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> originalArray = inputArray; // @step:initialize
    int arrayLength = originalArray.size(); // @step:initialize

    if (arrayLength == 0) {
        return {}; // @step:complete
    }

    std::vector<int> survivingElements = {originalArray[0]}; // @step:initialize — first element always survives
    int currentMaximum = originalArray[0]; // @step:initialize

    for (int scanIndex = 1; scanIndex < arrayLength; scanIndex++) {
        int candidateValue = originalArray[scanIndex];

        // @step:compare
        if (candidateValue >= currentMaximum) {
            // Element is in order — keep it
            currentMaximum = candidateValue; // @step:compare
            survivingElements.push_back(candidateValue); // @step:compare — keep
        }
        // Otherwise the element is eliminated (out of order)
        // @step:compare — eliminate
    }

    return survivingElements; // @step:complete
}
