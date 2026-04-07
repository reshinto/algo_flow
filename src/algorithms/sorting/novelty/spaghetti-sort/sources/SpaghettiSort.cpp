// Spaghetti Sort — find and remove tallest strand repeatedly (analogous to physical spaghetti rods)
#include <vector>
#include <algorithm>

std::vector<int> spaghettiSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> originalArray = inputArray; // @step:initialize
    int arrayLength = originalArray.size(); // @step:initialize

    // Simulate "holding up spaghetti bundles": work with a copy
    std::vector<int> remainingStrands = originalArray; // @step:initialize
    std::vector<int> sortedResult; // @step:initialize

    // Repeatedly find and remove the tallest strand (maximum element)
    for (int extractionPass = 0; extractionPass < arrayLength; extractionPass++) {
        // @step:find-tallest
        int tallestIndex = 0; // @step:find-tallest
        int tallestValue = remainingStrands[0]; // @step:find-tallest

        // Scan all remaining strands to find the tallest
        for (int scanIndex = 1; scanIndex < (int)remainingStrands.size(); scanIndex++) {
            // @step:compare
            if (remainingStrands[scanIndex] > tallestValue) {
                // @step:compare
                tallestIndex = scanIndex; // @step:compare
                tallestValue = remainingStrands[scanIndex]; // @step:compare
            }
        }

        // Remove the tallest strand and place it at the front of the sorted result
        remainingStrands.erase(remainingStrands.begin() + tallestIndex); // @step:swap
        sortedResult.insert(sortedResult.begin(), tallestValue); // @step:swap — prepend max to build result in ascending order

        // @step:mark-sorted
    }

    return sortedResult; // @step:complete
}
