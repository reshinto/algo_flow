// Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
#include <vector>
#include <unordered_map>

std::vector<int> topKFrequentElements(const std::vector<int>& numbers, int topK) {
    std::unordered_map<int, int> freqMap; // @step:initialize
    for (int current : numbers) {
        freqMap[current]++; // @step:increment-count
    }
    // Bucket sort: index = frequency, value = list of elements with that frequency
    std::vector<std::vector<int>> buckets(numbers.size() + 1);
    for (const auto& [num, freq] : freqMap) {
        buckets[freq].push_back(num); // @step:key-found
    }
    std::vector<int> result;
    for (int bucketIdx = (int)buckets.size() - 1; bucketIdx >= 0 && (int)result.size() < topK; bucketIdx--) {
        for (int num : buckets[bucketIdx]) {
            result.push_back(num); // @step:key-found
            if ((int)result.size() == topK) break;
        }
    }
    return result; // @step:complete
}
