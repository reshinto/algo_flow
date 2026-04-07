// Count Anagram Windows — O(n) sliding window with frequency map comparison
#include <vector>
#include <unordered_map>

std::pair<int, std::vector<int>> countAnagramWindows(
    const std::vector<int>& text, const std::vector<int>& pattern) {

    int patternLength = (int)pattern.size();
    int textLength = (int)text.size();

    if (patternLength == 0 || patternLength > textLength) {
        // @step:initialize
        return {0, {}}; // @step:initialize
    }

    std::unordered_map<int, int> patternFrequency; // @step:initialize
    std::unordered_map<int, int> windowFrequency; // @step:initialize
    std::vector<int> positions;

    // Build pattern frequency map
    for (int patternElement : pattern) { // @step:initialize
        patternFrequency[patternElement]++; // @step:initialize
    }

    // Build initial window frequency map
    for (int initIndex = 0; initIndex < patternLength; initIndex++) { // @step:move-window
        int currentElement = text[initIndex]; // @step:move-window
        windowFrequency[currentElement]++; // @step:move-window
    }

    // Helper lambda: compare two frequency maps for equality
    auto mapsAreEqual = [](const std::unordered_map<int,int>& mapA,
                           const std::unordered_map<int,int>& mapB) -> bool {
        if (mapA.size() != mapB.size()) return false;
        for (const auto& [key, value] : mapA) {
            auto it = mapB.find(key);
            if (it == mapB.end() || it->second != value) return false;
        }
        return true;
    };

    // Check first window
    if (mapsAreEqual(patternFrequency, windowFrequency)) { // @step:compare
        positions.push_back(0); // @step:compare
    }

    // Slide window across remaining positions
    for (int rightIndex = patternLength; rightIndex < textLength; rightIndex++) {
        int leftIndex = rightIndex - patternLength;
        int outgoingElement = text[leftIndex]; // @step:shrink-window
        int incomingElement = text[rightIndex]; // @step:expand-window

        // Remove outgoing element from window
        int outgoingCount = windowFrequency[outgoingElement] - 1; // @step:shrink-window
        if (outgoingCount == 0) { // @step:shrink-window
            windowFrequency.erase(outgoingElement); // @step:shrink-window
        } else {
            windowFrequency[outgoingElement] = outgoingCount; // @step:shrink-window
        }

        // Add incoming element to window
        windowFrequency[incomingElement]++; // @step:expand-window

        if (mapsAreEqual(patternFrequency, windowFrequency)) { // @step:compare
            positions.push_back(leftIndex + 1); // @step:compare
        }
    }

    return {(int)positions.size(), positions}; // @step:complete
}
