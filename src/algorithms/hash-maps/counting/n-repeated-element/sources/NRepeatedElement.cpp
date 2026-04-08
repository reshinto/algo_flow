// N-Repeated Element — find the element repeated n times in an array of size 2n
#include <vector>
#include <unordered_map>

int nRepeatedElement(const std::vector<int>& numbers) {
    std::unordered_map<int, int> frequencyMap; // @step:initialize
    int targetCount = (int)numbers.size() / 2;
    for (int currentNum : numbers) {
        int updatedCount = ++frequencyMap[currentNum]; // @step:increment-count
        if (updatedCount == targetCount) {
            return currentNum; // @step:key-found
        }
    }
    return -1; // @step:complete
}
