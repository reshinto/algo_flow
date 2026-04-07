// Hash-Based Search — build a hash map for O(1) lookup after O(n) build phase
#include <vector>
#include <unordered_map>

int hashSearch(const std::vector<int>& array, int targetValue) {
    // @step:initialize
    std::unordered_map<int, int> hashMap; // @step:initialize

    // Build phase: insert every element into the hash map
    for (int elementIndex = 0; elementIndex < static_cast<int>(array.size()); elementIndex++) {
        // @step:visit
        int elementValue = array[elementIndex]; // @step:visit
        hashMap[elementValue] = elementIndex; // @step:visit
    }

    // Search phase: O(1) lookup
    auto searchResult = hashMap.find(targetValue); // @step:compare
    if (searchResult != hashMap.end()) {
        // @step:compare,found
        return searchResult->second; // @step:found
    }

    return -1; // @step:complete
}
