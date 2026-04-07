// Longest Substring Without Repeating Characters — sliding window with hash map
#include <string>
#include <unordered_map>
#include <algorithm>

int longestSubstringWithoutRepeating(const std::string& text) {
    std::unordered_map<char, int> charIndexMap; // @step:initialize
    int windowStart = 0;
    int maxLength = 0;
    for (int windowEnd = 0; windowEnd < (int)text.size(); windowEnd++) {
        char currentChar = text[windowEnd];
        auto it = charIndexMap.find(currentChar); // @step:check-duplicate
        if (it != charIndexMap.end() && it->second >= windowStart) {
            windowStart = it->second + 1; // @step:shrink-window
        }
        charIndexMap[currentChar] = windowEnd; // @step:insert-key
        int currentLength = windowEnd - windowStart + 1; // @step:expand-window
        maxLength = std::max(maxLength, currentLength);
    }
    return maxLength; // @step:complete
}
