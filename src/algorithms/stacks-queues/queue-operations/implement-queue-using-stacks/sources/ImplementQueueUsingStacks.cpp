// Implement Queue Using Stacks — use two stacks to emulate FIFO queue behaviour (LeetCode 232)
#include <iostream>
#include <stack>
#include <vector>

std::vector<int> implementQueueUsingStacks(const std::vector<int>& values) {
    std::stack<int> inputStack; // @step:initialize
    std::stack<int> outputStack; // @step:initialize
    std::vector<int> dequeueResults; // @step:initialize

    // Push phase — enqueue all values into the input stack
    for (std::size_t elementIdx = 0; elementIdx < values.size(); elementIdx++) {
        int currentValue = values[elementIdx]; // @step:visit
        inputStack.push(currentValue); // @step:push
    }

    // Dequeue phase — transfer when output stack is empty, then pop
    while (!inputStack.empty() || !outputStack.empty()) {
        if (outputStack.empty()) {
            // Transfer all elements from input stack to output stack
            while (!inputStack.empty()) {
                int transferredValue = inputStack.top(); inputStack.pop(); // @step:transfer
                outputStack.push(transferredValue); // @step:transfer
            }
        }
        int dequeuedValue = outputStack.top(); outputStack.pop(); // @step:pop
        dequeueResults.push_back(dequeuedValue); // @step:pop
    }

    return dequeueResults; // @step:complete
}

int main() {
    auto result = implementQueueUsingStacks({1, 2, 3, 4});
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
