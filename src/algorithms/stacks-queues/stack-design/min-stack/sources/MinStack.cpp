// Min Stack — maintain a main stack paired with an auxiliary min-tracking stack for O(1) getMin
#include <iostream>
#include <stack>
#include <vector>

int minStack(const std::vector<int>& values) {
    std::stack<int> mainStack; // @step:initialize
    std::stack<int> minTracker; // @step:initialize

    for (std::size_t elementIdx = 0; elementIdx < values.size(); elementIdx++) {
        int currentValue = values[elementIdx]; // @step:visit

        mainStack.push(currentValue); // @step:push

        // Maintain auxiliary min stack: duplicate current min if new value is not smaller
        if (minTracker.empty() || currentValue <= minTracker.top()) { // @step:compare
            minTracker.push(currentValue); // @step:push-auxiliary
        } else {
            minTracker.push(minTracker.top()); // @step:push-auxiliary
        }
    }

    // The top of minTracker always holds the current minimum
    return minTracker.top(); // @step:peek,complete
}

#ifndef TESTING
int main() {
    std::cout << minStack({-2, 0, -3}) << std::endl;
    return 0;
}
#endif
