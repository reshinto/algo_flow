// Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
#include <iostream>
#include <unordered_map>
#include <vector>

std::vector<int> maxFrequencyStack(const std::vector<int>& values) {
    std::unordered_map<int, int> freqMap; // @step:initialize
    std::unordered_map<int, std::vector<int>> freqStacks; // @step:initialize
    int maxFrequency = 0; // @step:initialize
    std::vector<int> popResults; // @step:initialize

    // Push phase: update frequency map and push each value onto its frequency-level stack
    for (std::size_t elementIdx = 0; elementIdx < values.size(); elementIdx++) {
        int currentValue = values[elementIdx]; // @step:visit
        int currentFreq = freqMap[currentValue] + 1; // @step:compare
        freqMap[currentValue] = currentFreq; // @step:compare
        if (currentFreq > maxFrequency) {
            maxFrequency = currentFreq; // @step:compare
        }
        freqStacks[currentFreq].push_back(currentValue); // @step:push
    }

    // Pop phase: always pop from the highest-frequency stack
    while (maxFrequency > 0) {
        auto& topStack = freqStacks[maxFrequency]; // @step:pop
        int popped = topStack.back(); topStack.pop_back(); // @step:pop
        freqMap[popped]--; // @step:pop
        if (topStack.empty()) {
            maxFrequency--; // @step:pop
        }
        popResults.push_back(popped); // @step:pop
    }

    return popResults; // @step:complete
}

int main() {
    auto result = maxFrequencyStack({5, 7, 5, 7, 4, 5});
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
