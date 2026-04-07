// Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
#include <string>
#include <vector>
#include <unordered_map>

std::string sortCharactersByFrequency(const std::string& text) {
    std::unordered_map<char, int> freqMap; // @step:initialize
    for (char currentChar : text) {
        freqMap[currentChar]++; // @step:increment-count
    }
    // Bucket sort: index = frequency, value = list of chars with that frequency
    std::vector<std::vector<char>> buckets(text.size() + 1);
    for (const auto& [charVal, freq] : freqMap) {
        buckets[freq].push_back(charVal); // @step:key-found
    }
    std::string result;
    for (int bucketIdx = (int)buckets.size() - 1; bucketIdx >= 0; bucketIdx--) {
        for (char charVal : buckets[bucketIdx]) {
            result.append(bucketIdx, charVal); // @step:key-found
        }
    }
    return result; // @step:complete
}
