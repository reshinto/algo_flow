// Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
#include <iostream>
#include <queue>
#include <stack>
#include <vector>

std::vector<int> interleaveFirstHalfQueue(const std::vector<int>& values) {
    std::queue<int> queue; // @step:initialize
    for (int val : values) queue.push(val);
    int halfSize = static_cast<int>(values.size()) / 2; // @step:initialize
    std::stack<int> stack; // @step:initialize

    // Step 1: Dequeue first half into stack
    for (int fillIdx = 0; fillIdx < halfSize; fillIdx++) {
        stack.push(queue.front()); queue.pop(); // @step:push
    }

    // Step 2: Enqueue stack elements back to queue (reverses first half)
    while (!stack.empty()) {
        queue.push(stack.top()); stack.pop(); // @step:enqueue
    }

    // Step 3: Dequeue second half and enqueue back (move original second half to rear)
    for (int rotateIdx = 0; rotateIdx < halfSize; rotateIdx++) {
        queue.push(queue.front()); queue.pop(); // @step:transfer
    }

    // Step 4: Dequeue first half (originally first half, now at front) into stack
    for (int refillIdx = 0; refillIdx < halfSize; refillIdx++) {
        stack.push(queue.front()); queue.pop(); // @step:push
    }

    // Step 5: Interleave — alternately pop from stack and dequeue from queue
    std::vector<int> result; // @step:initialize
    while (!stack.empty()) {
        result.push_back(stack.top()); stack.pop(); // @step:pop
        result.push_back(queue.front()); queue.pop(); // @step:dequeue
    }
    if (!queue.empty()) {
        result.push_back(queue.front()); queue.pop(); // @step:dequeue
    }

    return result; // @step:complete
}

int main() {
    auto result = interleaveFirstHalfQueue({1, 2, 3, 4, 5, 6});
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
