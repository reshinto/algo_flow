// Spread Sort — hybrid distribution sort: distribute into bins by value, then insertion sort small bins
#include <vector>
#include <algorithm>
#include <cmath>

std::vector<int> spreadSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize

    if (arrayLength <= 1) {
        return sortedArray; // @step:complete
    }

    int minValue = *std::min_element(sortedArray.begin(), sortedArray.end()); // @step:initialize
    int maxValue = *std::max_element(sortedArray.begin(), sortedArray.end()); // @step:initialize

    if (minValue == maxValue) {
        return sortedArray; // @step:complete
    }

    // Number of bins — sqrt(n) is a common heuristic
    int binCount = (int)std::max(2.0, std::ceil(std::sqrt(arrayLength))); // @step:initialize
    std::vector<std::vector<int>> bins(binCount); // @step:initialize
    double valueRange = (double)(maxValue - minValue + 1); // @step:initialize

    // Distribute elements into bins based on value
    for (int distributeIndex = 0; distributeIndex < arrayLength; distributeIndex++) {
        // @step:distribute
        double normalizedOffset = (double)(sortedArray[distributeIndex] - minValue); // @step:distribute
        int binIndex = (int)((normalizedOffset / valueRange) * binCount); // @step:distribute
        binIndex = std::min(binIndex, binCount - 1); // @step:distribute
        bins[binIndex].push_back(sortedArray[distributeIndex]); // @step:distribute
    }

    // Process each bin — insertion sort for small bins
    int writeIndex = 0; // @step:compare
    for (int binIndex = 0; binIndex < binCount; binIndex++) {
        std::vector<int>& bin = bins[binIndex]; // @step:compare
        if (bin.empty()) continue; // @step:compare

        // Insertion sort within the bin
        for (int outerIndex = 1; outerIndex < (int)bin.size(); outerIndex++) {
            // @step:compare
            int currentValue = bin[outerIndex]; // @step:compare
            int insertPosition = outerIndex - 1; // @step:compare
            while (insertPosition >= 0 && bin[insertPosition] > currentValue) {
                // @step:compare
                bin[insertPosition + 1] = bin[insertPosition]; // @step:swap
                insertPosition--; // @step:swap
            }
            bin[insertPosition + 1] = currentValue; // @step:swap
        }

        // Write sorted bin back to the main array
        for (int binValue : bin) {
            sortedArray[writeIndex] = binValue; // @step:mark-sorted
            writeIndex++; // @step:mark-sorted
        }
    }

    return sortedArray; // @step:complete
}
