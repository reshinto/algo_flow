// Boyer-Moore Search (Bad Character Rule)
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Compares pattern right-to-left; on mismatch, shifts using the bad character table.
// Time: best O(n/m), average O(n), worst O(nm)
// Space: O(σ) where σ = alphabet size (number of distinct characters in pattern)

#include <string>
#include <unordered_map>
#include <algorithm>

std::unordered_map<char, int> buildBadCharTable(const std::string& pattern) {
    std::unordered_map<char, int> table; // @step:build-bad-char

    for (int charIdx = 0; charIdx < static_cast<int>(pattern.length()); charIdx++) {
        table[pattern[charIdx]] = charIdx; // @step:build-bad-char
    }

    return table; // @step:build-bad-char
}

int boyerMooreSearch(const std::string& text, const std::string& pattern) {
    if (pattern.empty()) return 0; // @step:initialize
    auto badCharTable = buildBadCharTable(pattern); // @step:initialize

    int patternLen = static_cast<int>(pattern.length()); // @step:initialize
    int textLen = static_cast<int>(text.length()); // @step:initialize

    int alignmentOffset = 0; // @step:initialize

    while (alignmentOffset <= textLen - patternLen) {
        // @step:visit
        int patternIdx = patternLen - 1; // @step:visit

        while (patternIdx >= 0 && pattern[patternIdx] == text[alignmentOffset + patternIdx]) {
            patternIdx--; // @step:char-match
        }

        if (patternIdx < 0) {
            // Full pattern matched
            return alignmentOffset; // @step:char-match
        }

        // Mismatch — compute shift using bad character table
        char mismatchChar = text[alignmentOffset + patternIdx]; // @step:char-mismatch
        auto it = badCharTable.find(mismatchChar);
        int badCharShift = (it != badCharTable.end()) ? it->second : -1; // @step:char-mismatch
        int shiftAmount = std::max(1, patternIdx - badCharShift); // @step:char-mismatch
        alignmentOffset += shiftAmount; // @step:shift-pattern
    }

    return -1; // @step:complete
}
