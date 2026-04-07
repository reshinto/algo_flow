// Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
#include <iostream>
#include <queue>
#include <vector>

std::vector<int> implementStackUsingQueues(const std::vector<int>& values) {
    std::queue<int> singleQueue; // @step:initialize
    std::vector<int> popResults; // @step:initialize

    // Push phase — enqueue each value, then rotate all prior elements behind it
    for (std::size_t elementIdx = 0; elementIdx < values.size(); elementIdx++) {
        int currentValue = values[elementIdx]; // @step:visit
        singleQueue.push(currentValue); // @step:enqueue
        // Rotate: move every element that was there before the new one to the back
        for (std::size_t rotationIdx = 0; rotationIdx < singleQueue.size() - 1; rotationIdx++) {
            int transferred = singleQueue.front(); singleQueue.pop(); // @step:transfer
            singleQueue.push(transferred); // @step:transfer
        }
    }

    // Pop phase — front of queue is always the most-recently pushed element (LIFO)
    while (!singleQueue.empty()) {
        int poppedValue = singleQueue.front(); singleQueue.pop(); // @step:dequeue
        popResults.push_back(poppedValue); // @step:dequeue
    }

    return popResults; // @step:complete
}

int main() {
    auto result = implementStackUsingQueues({1, 2, 3, 4});
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
