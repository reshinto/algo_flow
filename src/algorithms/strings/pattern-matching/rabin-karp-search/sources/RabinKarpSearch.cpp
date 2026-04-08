// Rabin-Karp Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Uses a rolling polynomial hash to skip comparisons when hashes differ.
// Time: O(n + m) average, O(n * m) worst case (hash collisions)
// Space: O(1)

#include <string>

const long long HASH_BASE = 31;
const long long HASH_PRIME = 1000000007;

int rabinKarpSearch(const std::string& text, const std::string& pattern) {
    if (pattern.empty()) return 0; // @step:initialize
    if (pattern.length() > text.length()) return -1; // @step:initialize

    int patternLen = static_cast<int>(pattern.length()); // @step:initialize
    int textLen = static_cast<int>(text.length()); // @step:initialize

    // Compute base^(patternLen-1) % prime for rolling hash window removal
    long long highPow = 1; // @step:initialize
    for (int powIdx = 0; powIdx < patternLen - 1; powIdx++) {
        highPow = (highPow * HASH_BASE) % HASH_PRIME; // @step:initialize
    }

    // Compute hash of pattern and first window
    long long patternHash = 0; // @step:initialize
    long long windowHash = 0; // @step:initialize
    for (int charIdx = 0; charIdx < patternLen; charIdx++) {
        patternHash = (patternHash * HASH_BASE + pattern[charIdx]) % HASH_PRIME; // @step:initialize
        windowHash = (windowHash * HASH_BASE + text[charIdx]) % HASH_PRIME; // @step:initialize
    }

    // Slide the window over the text
    for (int windowStart = 0; windowStart <= textLen - patternLen; windowStart++) {
        // @step:visit
        if (windowHash == patternHash) {
            // Hashes match — verify character by character to rule out false positives
            int charIdx = 0; // @step:char-match
            while (charIdx < patternLen && text[windowStart + charIdx] == pattern[charIdx]) {
                charIdx++; // @step:char-match
            }

            if (charIdx == patternLen) {
                return windowStart; // @step:char-match
            }
            // Hash collision — hashes matched but characters did not
        }

        // Roll hash: remove leading character, add next character
        if (windowStart < textLen - patternLen) {
            long long outgoingCharCode = text[windowStart]; // @step:pattern-shift
            long long incomingCharCode = text[windowStart + patternLen]; // @step:pattern-shift
            windowHash =
                ((windowHash - outgoingCharCode * highPow) * HASH_BASE + incomingCharCode)
                    % HASH_PRIME; // @step:pattern-shift
            if (windowHash < 0) windowHash += HASH_PRIME; // @step:pattern-shift
        }
    }

    return -1; // @step:complete
}
