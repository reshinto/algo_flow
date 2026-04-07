// Counting Sort — O(n+k) sort by counting frequencies and reconstructing sorted order
#include <vector>
#include <algorithm>

std::vector<int> countingSort(const std::vector<int>& inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {}; // @step:initialize
    }

    int maxValue = *std::max_element(inputArray.begin(), inputArray.end()); // @step:initialize
    std::vector<int> countArray(maxValue + 1, 0); // @step:initialize

    // Count the frequency of each element
    for (int scanIndex = 0; scanIndex < (int)inputArray.size(); scanIndex++) {
        countArray[inputArray[scanIndex]]++; // @step:visit
    }

    // Reconstruct the sorted array from count frequencies
    std::vector<int> sortedArray; // @step:compare
    for (int currentValue = 0; currentValue <= maxValue; currentValue++) {
        for (int repeatIndex = 0; repeatIndex < countArray[currentValue]; repeatIndex++) {
            sortedArray.push_back(currentValue); // @step:compare
        }
    }

    return sortedArray; // @step:complete
}
