// Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
#include <iostream>
#include <queue>
#include <vector>

std::vector<int> numberOfRecentCalls(const std::vector<int>& timestamps) {
    std::queue<int> windowQueue; // @step:initialize
    std::vector<int> results; // @step:initialize

    for (std::size_t timestampIdx = 0; timestampIdx < timestamps.size(); timestampIdx++) {
        int currentTimestamp = timestamps[timestampIdx]; // @step:visit

        windowQueue.push(currentTimestamp); // @step:enqueue

        // Remove timestamps outside the 3000ms window
        while (windowQueue.front() < currentTimestamp - 3000) { // @step:dequeue
            windowQueue.pop(); // @step:dequeue
        }

        results.push_back(static_cast<int>(windowQueue.size())); // @step:complete
    }

    return results; // @step:complete
}

int main() {
    std::vector<int> timestamps = {1, 100, 3001, 3002};
    auto result = numberOfRecentCalls(timestamps);
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
