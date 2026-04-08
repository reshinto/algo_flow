// Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
#include <iostream>
#include <deque>
#include <vector>

std::vector<int> slidingWindowMaxMonotonic(const std::vector<int>& nums, int windowSize) {
    std::deque<int> monoDeque; // @step:initialize
    std::vector<int> result; // @step:initialize
    for (int elementIdx = 0; elementIdx < static_cast<int>(nums.size()); elementIdx++) {
        // @step:visit
        // Remove indices that have fallen outside the current window
        while (!monoDeque.empty() && monoDeque.front() <= elementIdx - windowSize) { // @step:dequeue
            monoDeque.pop_front(); // @step:dequeue
        }
        // Maintain monotonic decreasing order — remove smaller elements from the rear
        while (!monoDeque.empty() && nums[monoDeque.back()] <= nums[elementIdx]) { // @step:maintain-monotonic
            monoDeque.pop_back(); // @step:maintain-monotonic
        }
        monoDeque.push_back(elementIdx); // @step:enqueue
        // Once the first full window is reached, record the maximum (front of deque)
        if (elementIdx >= windowSize - 1) { // @step:peek
            result.push_back(nums[monoDeque.front()]); // @step:peek
        }
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    auto result = slidingWindowMaxMonotonic(nums, 3);
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
#endif
