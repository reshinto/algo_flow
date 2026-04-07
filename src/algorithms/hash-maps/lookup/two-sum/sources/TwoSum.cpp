// Two Sum — find two indices whose values add up to the target using a hash map
#include <vector>
#include <unordered_map>

std::vector<int> twoSum(const std::vector<int>& numbers, int target) {
    std::unordered_map<int, int> map; // @step:initialize
    for (int idx = 0; idx < (int)numbers.size(); idx++) {
        int complement = target - numbers[idx]; // @step:lookup-key
        auto it = map.find(complement);
        if (it != map.end()) {
            // @step:key-found
            return {it->second, idx}; // @step:key-found
        }
        // Complement not found — store current number for future lookups
        map[numbers[idx]] = idx; // @step:insert-key
    }
    return {-1, -1}; // @step:complete
}
