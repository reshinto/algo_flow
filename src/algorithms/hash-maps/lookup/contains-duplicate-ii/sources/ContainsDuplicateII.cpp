// Contains Duplicate II — find if the same value appears within maxDistance index gap
#include <vector>
#include <unordered_map>
#include <cstdlib>

bool containsDuplicateII(const std::vector<int>& numbers, int maxDistance) {
    std::unordered_map<int, int> indexMap; // @step:initialize
    for (int currentIndex = 0; currentIndex < (int)numbers.size(); currentIndex++) {
        int current = numbers[currentIndex];
        auto it = indexMap.find(current);
        if (it != indexMap.end()) {
            // @step:check-duplicate
            int storedIndex = it->second;
            if (std::abs(currentIndex - storedIndex) <= maxDistance) {
                // @step:key-found
                return true; // @step:key-found
            }
            // Too far apart — update stored index to keep closest occurrence
            indexMap[current] = currentIndex; // @step:update-value
        } else {
            // First time seeing this value — store its index
            indexMap[current] = currentIndex; // @step:insert-key
        }
    }
    return false; // @step:complete
}
