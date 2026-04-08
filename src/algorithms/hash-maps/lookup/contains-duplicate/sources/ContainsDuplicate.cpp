// Contains Duplicate — determine if any value appears at least twice using a hash set
#include <vector>
#include <unordered_set>

bool containsDuplicate(const std::vector<int>& numbers) {
    std::unordered_set<int> seen; // @step:initialize
    for (int current : numbers) {
        if (seen.count(current)) {
            // @step:key-found
            return true; // @step:key-found
        }
        // Not seen yet — record it for future duplicate checks
        seen.insert(current); // @step:insert-key
    }
    return false; // @step:complete
}
