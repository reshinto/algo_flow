// Group Anagrams — group words that are anagrams of each other using sorted-key hashing
#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>

std::vector<std::vector<std::string>> groupAnagrams(const std::vector<std::string>& words) {
    std::unordered_map<std::string, std::vector<std::string>> map; // @step:initialize
    for (const std::string& word : words) {
        std::string sortedKey = word;
        std::sort(sortedKey.begin(), sortedKey.end()); // @step:lookup-key
        if (map.count(sortedKey)) {
            map[sortedKey].push_back(word); // @step:update-value
        } else {
            map[sortedKey] = {word}; // @step:insert-key
        }
    }
    std::vector<std::vector<std::string>> result;
    for (auto& [key, group] : map) {
        result.push_back(std::move(group));
    }
    return result; // @step:complete
}
