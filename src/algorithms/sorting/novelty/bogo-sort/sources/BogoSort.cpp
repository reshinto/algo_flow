// Bogo Sort — randomly shuffle until sorted; uses seeded LCG PRNG for determinism
#include <vector>
#include <algorithm>

std::vector<int> bogoSort(std::vector<int> inputArray) {
    // @step:initialize
    std::vector<int> sortedArray = inputArray; // @step:initialize
    int arrayLength = sortedArray.size(); // @step:initialize
    const int maxIterations = 100; // @step:initialize

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

    auto shuffleArray = [&]() {
        // @step:shuffle
        for (int shuffleIndex = arrayLength - 1; shuffleIndex > 0; shuffleIndex--) {
            // @step:shuffle
            int swapTarget = nextRandom() % (shuffleIndex + 1); // @step:shuffle
            std::swap(sortedArray[shuffleIndex], sortedArray[swapTarget]); // @step:swap
        }
    };

    int iterationCount = 0;
    while (!isSorted() && iterationCount < maxIterations) {
        shuffleArray();
        iterationCount++;
    }

    // @step:mark-sorted

    return sortedArray; // @step:complete
}
