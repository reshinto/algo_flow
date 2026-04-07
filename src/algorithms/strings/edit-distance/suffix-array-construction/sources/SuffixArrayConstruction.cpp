// Suffix Array Construction (naive approach)
// Generates all suffixes of a string, sorts them lexicographically,
// and returns the array of starting indices in sorted suffix order.
// Time: O(n log²n) due to string comparisons during sort, Space: O(n)

#include <string>
#include <vector>
#include <algorithm>

std::vector<int> suffixArrayConstruction(const std::string& text) {
    int textLength = static_cast<int>(text.length()); // @step:initialize

    if (textLength == 0) {
        return {}; // @step:complete
    }

    // Build array of suffix starting indices [0, 1, ..., n-1]
    std::vector<int> suffixIndices(textLength);
    for (int idx = 0; idx < textLength; idx++) {
        suffixIndices[idx] = idx; // @step:initialize
    }

    // Sort indices by their corresponding suffix lexicographically
    std::sort(suffixIndices.begin(), suffixIndices.end(),
        [&text](int firstIdx, int secondIdx) {
            // @step:compare
            const std::string firstSuffix = text.substr(firstIdx); // @step:compare
            const std::string secondSuffix = text.substr(secondIdx); // @step:compare
            if (firstSuffix < secondSuffix) return true; // @step:compare
            if (firstSuffix > secondSuffix) return false; // @step:compare
            return false; // @step:compare
        });

    return suffixIndices; // @step:complete
}
