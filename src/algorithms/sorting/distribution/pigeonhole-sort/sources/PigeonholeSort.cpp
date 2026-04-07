// Pigeonhole Sort — place each element in its own hole, then collect in order
#include <vector>
#include <algorithm>

std::vector<int> pigeonholeSort(std::vector<int> inputArray) {
    // @step:initialize
    if (inputArray.empty()) return {}; // @step:initialize
    std::vector<int> workingArray = inputArray; // @step:initialize
    int arrayLength = workingArray.size(); // @step:initialize

    int minValue = *std::min_element(workingArray.begin(), workingArray.end()); // @step:initialize
    int maxValue = *std::max_element(workingArray.begin(), workingArray.end()); // @step:initialize
    int holeCount = maxValue - minValue + 1; // @step:initialize

    // Create one pigeonhole per distinct value in range
    std::vector<int> holes(holeCount, 0); // @step:initialize

    // Place each element into its corresponding pigeonhole
    for (int placeIndex = 0; placeIndex < arrayLength; placeIndex++) {
        // @step:place,compare
        int holePosition = workingArray[placeIndex] - minValue; // @step:place,compare
        holes[holePosition]++; // @step:place
    }

    // Collect elements back from pigeonholes in ascending order
    int writeIndex = 0; // @step:collect
    for (int holeIndex = 0; holeIndex < holeCount; holeIndex++) {
        // @step:collect
        while (holes[holeIndex] > 0) {
            // @step:collect
            workingArray[writeIndex] = holeIndex + minValue; // @step:collect
            writeIndex++; // @step:collect
            holes[holeIndex]--; // @step:collect
        }
    }

    // @step:mark-sorted
    return workingArray; // @step:complete
}
