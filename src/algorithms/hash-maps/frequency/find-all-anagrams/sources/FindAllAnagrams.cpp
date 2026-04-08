// Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
#include <string>
#include <vector>
#include <unordered_map>

bool mapsEqual(const std::unordered_map<char, int>& mapA, const std::unordered_map<char, int>& mapB) {
    if (mapA.size() != mapB.size()) return false;
    for (const auto& [key, value] : mapA) {
        auto it = mapB.find(key);
        if (it == mapB.end() || it->second != value) return false;
    }
    return true;
}

std::vector<int> findAllAnagrams(const std::string& text, const std::string& pattern) {
    std::unordered_map<char, int> patternFreq; // @step:initialize
    for (char patternChar : pattern) {
        patternFreq[patternChar]++; // @step:increment-count
    }
    std::unordered_map<char, int> windowFreq;
    int windowSize = (int)pattern.size();
    std::vector<int> result;
    for (int rightIdx = 0; rightIdx < (int)text.size(); rightIdx++) {
        // Expand window: add incoming character
        char incomingChar = text[rightIdx];
        windowFreq[incomingChar]++; // @step:expand-window
        // Shrink window: remove outgoing character once full window is established
        if (rightIdx >= windowSize) {
            char outgoingChar = text[rightIdx - windowSize];
            int outgoingCount = --windowFreq[outgoingChar]; // @step:shrink-window
            if (outgoingCount == 0) {
                windowFreq.erase(outgoingChar); // @step:decrement-count
            }
            // @step:decrement-count
        }
        // Check if current window matches pattern frequency map
        if (rightIdx >= windowSize - 1) {
            if (mapsEqual(windowFreq, patternFreq)) {
                result.push_back(rightIdx - windowSize + 1); // @step:key-found
            }
        }
    }
    return result; // @step:complete
}
