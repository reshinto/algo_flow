// Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
#include <vector>
#include <cmath>

std::vector<int> findAllDuplicates(std::vector<int> inputArray) {
    std::vector<int> result = inputArray; // @step:initialize
    std::vector<int> duplicates; // @step:initialize

    // Mark visited positions by negating the value at the mapped index
    for (int scanIndex = 0; scanIndex < (int)result.size(); scanIndex++) {
        int mappedIndex = std::abs(result[scanIndex]) - 1; // @step:compare

        if (result[mappedIndex] < 0) {
            // Already negative means we visited this index before — duplicate found
            duplicates.push_back(std::abs(result[scanIndex])); // @step:compare
        } else {
            result[mappedIndex] = -result[mappedIndex]; // @step:swap
        }
    }

    return duplicates; // @step:complete
}
