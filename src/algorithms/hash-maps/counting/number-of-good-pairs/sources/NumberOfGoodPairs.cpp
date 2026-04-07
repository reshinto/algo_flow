// Number of Good Pairs — count pairs (i, j) where nums[i] == nums[j] and i < j
#include <vector>
#include <unordered_map>

int numberOfGoodPairs(const std::vector<int>& numbers) {
    std::unordered_map<int, int> frequencyMap; // @step:initialize
    int totalPairs = 0;
    for (int currentNum : numbers) {
        int currentCount = frequencyMap[currentNum];
        totalPairs += currentCount; // @step:key-found
        frequencyMap[currentNum] = currentCount + 1; // @step:increment-count
    }
    return totalPairs; // @step:complete
}
