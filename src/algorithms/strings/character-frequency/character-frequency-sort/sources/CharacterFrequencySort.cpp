// Character Frequency Sort
// Sorts a string by character frequency (descending) using bucket sort.
// Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
// Space: O(n) — frequency map and output string both scale with input size

#include <string>
#include <unordered_map>
#include <vector>

std::string characterFrequencySort(const std::string& text) {
    if (text.empty()) return ""; // @step:initialize

    std::unordered_map<char, int> frequencyMap; // @step:initialize

    for (char ch : text) {
        // @step:update-frequency
        frequencyMap[ch]++; // @step:update-frequency
    }

    // Bucket sort: index = frequency, value = list of chars with that frequency
    int maxFrequency = static_cast<int>(text.length()); // @step:sort-by-frequency
    std::vector<std::vector<char>> buckets(maxFrequency + 1); // @step:sort-by-frequency

    for (const auto& entry : frequencyMap) {
        // @step:sort-by-frequency
        buckets[entry.second].push_back(entry.first); // @step:sort-by-frequency
    }

    std::string result; // @step:build-output
    for (int freqIdx = maxFrequency; freqIdx >= 1; freqIdx--) {
        // @step:build-output
        for (char ch : buckets[freqIdx]) {
            // @step:add-to-result
            result.append(freqIdx, ch); // @step:add-to-result
        }
    }

    return result; // @step:complete
}
