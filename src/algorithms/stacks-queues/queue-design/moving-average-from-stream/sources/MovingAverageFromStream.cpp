// Moving Average from Data Stream — fixed-size sliding window queue (LeetCode 346)
#include <iostream>
#include <queue>
#include <vector>

std::vector<double> movingAverageFromStream(const std::vector<double>& values, int windowSize) {
    std::queue<double> windowQueue; // @step:initialize
    double runningSum = 0.0; // @step:initialize
    std::vector<double> averages; // @step:initialize

    for (std::size_t valueIndex = 0; valueIndex < values.size(); valueIndex++) {
        double currentValue = values[valueIndex]; // @step:visit

        windowQueue.push(currentValue); // @step:enqueue
        runningSum += currentValue; // @step:enqueue

        if (static_cast<int>(windowQueue.size()) > windowSize) { // @step:dequeue
            runningSum -= windowQueue.front(); // @step:dequeue
            windowQueue.pop(); // @step:dequeue
        }

        averages.push_back(runningSum / static_cast<double>(windowQueue.size())); // @step:complete
    }

    return averages; // @step:complete
}

int main() {
    std::vector<double> values = {1.0, 10.0, 3.0, 5.0};
    auto averages = movingAverageFromStream(values, 3);
    for (double avg : averages) std::cout << avg << " ";
    std::cout << std::endl;
    return 0;
}
