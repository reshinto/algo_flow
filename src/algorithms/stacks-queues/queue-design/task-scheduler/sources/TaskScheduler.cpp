// Task Scheduler — greedy formula with cooldown queue simulation (LeetCode 621)
#include <iostream>
#include <algorithm>
#include <deque>
#include <string>
#include <tuple>
#include <unordered_map>
#include <vector>

int taskSchedulerQueue(const std::vector<std::string>& tasks, int cooldown) {
    std::unordered_map<std::string, int> freqMap; // @step:initialize
    for (const auto& task : tasks) { // @step:initialize
        freqMap[task]++; // @step:initialize
    }

    int maxFreq = 0; // @step:initialize
    int maxFreqCount = 0; // @step:initialize

    for (const auto& [task, freq] : freqMap) { // @step:visit
        if (freq > maxFreq) { // @step:compare
            maxFreq = freq; // @step:compare
            maxFreqCount = 1; // @step:compare
        } else if (freq == maxFreq) { // @step:compare
            maxFreqCount++; // @step:compare
        }
    }

    // Queue holds {taskName, remainingFreq, availableAtTime} for cooling-down tasks
    std::deque<std::tuple<std::string, int, int>> cooldownQueue; // @step:enqueue

    // Sorted descending by frequency — acts as a max-heap
    std::vector<std::pair<std::string, int>> taskHeap(freqMap.begin(), freqMap.end());
    std::sort(taskHeap.begin(), taskHeap.end(),
        [](const auto& entryA, const auto& entryB) { return entryB.second < entryA.second; }); // @step:enqueue

    int currentTime = 0; // @step:enqueue

    while (!taskHeap.empty() || !cooldownQueue.empty()) { // @step:visit
        currentTime++; // @step:visit

        // Release tasks from the cooldown queue when their wait is over
        if (!cooldownQueue.empty() && std::get<2>(cooldownQueue.front()) <= currentTime) { // @step:dequeue
            auto [taskName, remaining, availableAt] = cooldownQueue.front();
            cooldownQueue.pop_front(); // @step:dequeue
            taskHeap.push_back({taskName, remaining}); // @step:dequeue
            std::sort(taskHeap.begin(), taskHeap.end(),
                [](const auto& entryA, const auto& entryB) { return entryB.second < entryA.second; }); // @step:dequeue
        }

        // Execute the highest-frequency available task and enqueue it to cool down
        if (!taskHeap.empty()) { // @step:enqueue
            auto [topTask, topFreq] = taskHeap.front();
            taskHeap.erase(taskHeap.begin()); // @step:enqueue
            int remainingFreq = topFreq - 1; // @step:enqueue
            if (remainingFreq > 0) { // @step:enqueue
                cooldownQueue.push_back({topTask, remainingFreq, currentTime + cooldown + 1}); // @step:enqueue
            }
        }
    }

    // Greedy formula — closed-form solution is equivalent to the simulation result
    int formulaResult = (maxFreq - 1) * (cooldown + 1) + maxFreqCount; // @step:complete
    return std::max(static_cast<int>(tasks.size()), formulaResult); // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<std::string> tasks = {"A", "A", "A", "B", "B", "B"};
    std::cout << taskSchedulerQueue(tasks, 2) << std::endl;
    return 0;
}
#endif
