// Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
#include <vector>

std::vector<int> differenceArray(int arrayLength, const std::vector<std::vector<int>>& updates) {
    std::vector<int> diffArray(arrayLength + 1, 0); // @step:initialize
    std::vector<int> result(arrayLength, 0); // @step:initialize

    // Apply each range update [left, right, delta] to the difference array
    for (int updateIndex = 0; updateIndex < (int)updates.size(); updateIndex++) {
        int leftBound = updates[updateIndex][0]; // @step:visit
        int rightBound = updates[updateIndex][1]; // @step:visit
        int delta = updates[updateIndex][2]; // @step:visit
        diffArray[leftBound] += delta; // @step:compare
        if (rightBound + 1 < (int)diffArray.size()) { // @step:compare
            diffArray[rightBound + 1] -= delta; // @step:compare
        }
    }

    // Reconstruct result via prefix sum of the difference array
    int runningSum = 0; // @step:visit
    for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
        runningSum += diffArray[scanIndex]; // @step:visit
        result[scanIndex] = runningSum; // @step:visit
    }

    return result; // @step:complete
}
