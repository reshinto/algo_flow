// Majority Element — find the element that appears more than n/2 times using a frequency map
#include <vector>
#include <unordered_map>

int majorityElement(const std::vector<int>& numbers) {
    std::unordered_map<int, int> frequencyMap; // @step:initialize
    int threshold = (int)numbers.size() / 2; // @step:initialize
    for (int currentNum : numbers) {
        int updatedCount = ++frequencyMap[currentNum]; // @step:increment-count
        if (updatedCount > threshold) {
            return currentNum; // @step:key-found
        }
    }
    return -1; // @step:complete
}
