// Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
#include <vector>
#include <deque>

std::vector<int> slidingWindowMaxDeque(const std::vector<int>& inputArray, int windowSize) {
    int arrayLength = (int)inputArray.size();
    if (arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength) {
        // @step:initialize
        return {}; // @step:initialize
    }

    std::vector<int> result; // @step:initialize
    std::deque<int> deque; // @step:initialize — stores indices, front = max of current window

    for (int currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
        // Remove indices outside the current window from the front
        while (!deque.empty() && deque.front() < currentIndex - windowSize + 1) { // @step:compare
            deque.pop_front(); // @step:visit
        }

        // Remove indices of elements smaller than the current element from the back
        while (!deque.empty() && inputArray[deque.back()] < inputArray[currentIndex]) { // @step:compare
            deque.pop_back(); // @step:visit
        }

        deque.push_back(currentIndex); // @step:visit

        // The window is fully formed once currentIndex >= windowSize - 1
        if (currentIndex >= windowSize - 1) { // @step:compare
            result.push_back(inputArray[deque.front()]); // @step:visit
        }
    }

    return result; // @step:complete
}
