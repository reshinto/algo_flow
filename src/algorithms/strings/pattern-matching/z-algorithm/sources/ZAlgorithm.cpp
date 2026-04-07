// Z-Algorithm Pattern Matching
// Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
// starting at i that matches a prefix of the combined string.
// If Z[i] == pattern.length, pattern found at position i - pattern.length - 1 in the text.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(n + m) for the combined string and Z-array

#include <string>
#include <vector>
#include <algorithm>

int zAlgorithm(const std::string& text, const std::string& pattern) {
    if (pattern.empty()) return 0; // @step:initialize
    std::string combined = pattern + "$" + text; // @step:initialize
    int combinedLength = static_cast<int>(combined.length()); // @step:initialize
    int patternLength = static_cast<int>(pattern.length());
    std::vector<int> zArray(combinedLength, 0); // @step:initialize

    int windowLeft = 0; // @step:initialize
    int windowRight = 0; // @step:initialize

    for (int pos = 1; pos < combinedLength; pos++) {
        // @step:build-failure
        if (pos < windowRight) {
            zArray[pos] = std::min(windowRight - pos, zArray[pos - windowLeft]); // @step:build-failure
        }

        while (pos + zArray[pos] < combinedLength
            && combined[zArray[pos]] == combined[pos + zArray[pos]]) {
            zArray[pos]++; // @step:build-failure
        }

        if (pos + zArray[pos] > windowRight) {
            windowLeft = pos; // @step:build-failure
            windowRight = pos + zArray[pos]; // @step:build-failure
        }

        if (zArray[pos] == patternLength) {
            return pos - patternLength - 1; // @step:char-match
        }
    }

    return -1; // @step:complete
}
