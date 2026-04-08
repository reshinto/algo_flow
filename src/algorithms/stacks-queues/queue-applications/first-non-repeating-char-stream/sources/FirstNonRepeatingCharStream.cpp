// First Non-Repeating Char Stream — use a queue as candidate buffer and a frequency map to find the first non-repeating character at each step
#include <iostream>
#include <queue>
#include <string>
#include <unordered_map>
#include <vector>

std::vector<std::string> firstNonRepeatingCharStream(const std::string& inputString) {
    std::unordered_map<char, int> freqMap; // @step:initialize
    std::queue<char> charQueue; // @step:initialize
    std::vector<std::string> results; // @step:initialize
    for (char ch : inputString) {
        // @step:visit
        freqMap[ch]++; // @step:visit
        charQueue.push(ch); // @step:enqueue
        // Remove repeated characters from the front of the queue
        while (!charQueue.empty() && freqMap[charQueue.front()] > 1) { // @step:dequeue
            charQueue.pop(); // @step:dequeue
        }
        std::string answer = charQueue.empty() ? "#" : std::string(1, charQueue.front()); // @step:peek
        results.push_back(answer); // @step:peek
    }
    return results; // @step:complete
}

#ifndef TESTING
int main() {
    auto results = firstNonRepeatingCharStream("aabcbc");
    for (const auto& res : results) std::cout << res << " ";
    std::cout << std::endl;
    return 0;
}
#endif
