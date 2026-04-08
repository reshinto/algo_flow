// Bozo Sort — randomly swap two elements until sorted; uses seeded LCG PRNG for determinism
#include <vector>
#include <algorithm>

std::vector<int> bozoSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    const int maxIterations = 200; // @step:initialize

    // Seeded linear congruential generator for deterministic behavior
    unsigned int seed = 42; // @step:initialize
    auto nextRandom = [&]() -> int {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return (int)seed;
    };

    auto isSorted = [&]() -> bool {
        // @step:check-sorted
        for (int checkIndex = 0; checkIndex + 1 < arrayLength; checkIndex++) {
            // @step:compare
            if (sortedArray[checkIndex] > sortedArray[checkIndex + 1]) {
                // @step:compare
                return false; // @step:compare
            }
        }
        return true; // @step:check-sorted
    };

    int iterationCount = 0;
    while (!isSorted() && iterationCount < maxIterations) {
        // Pick two random distinct indices and swap them
        int firstSwapIndex = nextRandom() % arrayLength; // @step:swap
        int secondSwapIndex = nextRandom() % arrayLength; // @step:swap

        if (firstSwapIndex != secondSwapIndex) {
            // @step:swap
            std::swap(sortedArray[firstSwapIndex], sortedArray[secondSwapIndex]); // @step:swap
        }

        iterationCount++;
    }

    return sortedArray; // @step:complete
}
