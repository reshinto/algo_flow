// First Non-Repeating Character
// Returns the index of the first character that appears exactly once, or -1 if none.
// Time: O(n) — two passes over the string (bounded by alphabet size)
// Space: O(1) — frequency map bounded by alphabet size (26 letters)

#include <string>
#include <unordered_map>

int firstNonRepeatingCharacter(const std::string& text) {
    std::unordered_map<char, int> frequencyMap; // @step:initialize

    for (char ch : text) {
        // @step:update-frequency
        frequencyMap[ch]++; // @step:update-frequency
    }

    for (int charIdx = 0; charIdx < static_cast<int>(text.length()); charIdx++) {
        // @step:compare
        if (frequencyMap[text[charIdx]] == 1) return charIdx; // @step:found
    }

    return -1; // @step:complete
}
