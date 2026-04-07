// Minimum Window Substring
// Finds the smallest contiguous window in `text` that contains all characters of `pattern`.
// Returns an empty string if no such window exists.
// Time: O(n + m) where n = text.length, m = pattern.length
// Space: O(σ) — frequency maps bounded by alphabet size

#include <string>
#include <unordered_map>
#include <climits>

std::string minimumWindowSubstring(const std::string& text, const std::string& pattern) {
    if (pattern.empty() || text.length() < pattern.length()) return ""; // @step:initialize

    std::unordered_map<char, int> targetFrequency; // @step:initialize
    for (char ch : pattern) {
        // @step:initialize
        targetFrequency[ch]++; // @step:initialize
    }

    std::unordered_map<char, int> windowFrequency; // @step:initialize
    int required = static_cast<int>(targetFrequency.size()); // @step:initialize
    int satisfied = 0; // @step:initialize
    int leftIndex = 0; // @step:initialize
    int bestStart = -1; // @step:initialize
    int bestLength = INT_MAX; // @step:initialize

    for (int rightIndex = 0; rightIndex < static_cast<int>(text.length()); rightIndex++) {
        // @step:expand-window
        char rightChar = text[rightIndex]; // @step:expand-window
        windowFrequency[rightChar]++; // @step:update-frequency

        auto targetIt = targetFrequency.find(rightChar);
        if (targetIt != targetFrequency.end() && windowFrequency[rightChar] == targetIt->second) {
            // @step:window-match
            satisfied++; // @step:window-match
        }

        while (satisfied == required) {
            // @step:shrink-window
            int windowLength = rightIndex - leftIndex + 1; // @step:add-to-result
            if (windowLength < bestLength) {
                // @step:add-to-result
                bestLength = windowLength; // @step:add-to-result
                bestStart = leftIndex; // @step:add-to-result
            }

            char leftChar = text[leftIndex]; // @step:shrink-window
            windowFrequency[leftChar]--; // @step:update-frequency

            auto leftTargetIt = targetFrequency.find(leftChar);
            if (leftTargetIt != targetFrequency.end() && windowFrequency[leftChar] < leftTargetIt->second) {
                // @step:shrink-window
                satisfied--; // @step:shrink-window
            }

            leftIndex++; // @step:shrink-window
        }
    }

    return bestStart == -1 ? "" : text.substr(bestStart, bestLength); // @step:complete
}
