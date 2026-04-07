// Longest Consecutive Sequence — find the length of the longest consecutive run using a hash set
#include <vector>
#include <unordered_set>
#include <algorithm>

int longestConsecutiveSequence(const std::vector<int>& numbers) {
    std::unordered_set<int> numSet; // @step:initialize
    for (int num : numbers) {
        numSet.insert(num); // @step:insert-key
    }
    int maxLength = 0;
    for (int currentNumber : numbers) {
        if (!numSet.count(currentNumber - 1)) {
            // @step:lookup-key
            // This number is a sequence start — count forward
            int sequenceLength = 1;
            int nextNumber = currentNumber + 1;
            while (numSet.count(nextNumber)) {
                // @step:key-found
                sequenceLength++;
                nextNumber++;
            }
            maxLength = std::max(maxLength, sequenceLength); // @step:key-not-found
        }
    }
    return maxLength; // @step:complete
}
