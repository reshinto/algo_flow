// Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
#include <iostream>
#include <stack>
#include <vector>

long long sumOfSubarrayMinimums(const std::vector<long long>& arr) {
    const long long MOD = 1'000'000'007; // @step:initialize
    std::size_t arrayLength = arr.size(); // @step:initialize
    std::vector<long long> leftDistances(arrayLength, 0); // @step:initialize
    std::vector<long long> rightDistances(arrayLength, 0); // @step:initialize
    std::stack<std::size_t> indexStack; // @step:initialize

    // Compute left distances: distance to previous less element
    for (std::size_t elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
        long long currentValue = arr[elementIdx]; // @step:visit
        // Pop while stack top has value >= current (not strictly less)
        while (!indexStack.empty() && arr[indexStack.top()] >= currentValue) { // @step:compare
            indexStack.pop(); // @step:maintain-monotonic
        }
        leftDistances[elementIdx] = indexStack.empty()
            ? static_cast<long long>(elementIdx) + 1
            : static_cast<long long>(elementIdx) - static_cast<long long>(indexStack.top()); // @step:resolve
        indexStack.push(elementIdx); // @step:push
    }

    while (!indexStack.empty()) indexStack.pop(); // @step:initialize

    // Compute right distances: distance to next less-or-equal element
    for (std::size_t elementIdx = arrayLength; elementIdx-- > 0;) {
        long long currentValue = arr[elementIdx]; // @step:visit
        // Pop while stack top has value > current (strictly greater — allows equal on right)
        while (!indexStack.empty() && arr[indexStack.top()] > currentValue) { // @step:compare
            indexStack.pop(); // @step:maintain-monotonic
        }
        rightDistances[elementIdx] = indexStack.empty()
            ? static_cast<long long>(arrayLength) - static_cast<long long>(elementIdx)
            : static_cast<long long>(indexStack.top()) - static_cast<long long>(elementIdx); // @step:resolve
        indexStack.push(elementIdx); // @step:push
    }

    // Sum contributions: each element contributes arr[i] * left[i] * right[i]
    long long result = 0; // @step:initialize
    for (std::size_t elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
        result = (result + arr[elementIdx] * leftDistances[elementIdx] * rightDistances[elementIdx]) % MOD; // @step:resolve
    }

    return result; // @step:complete
}

int main() {
    std::vector<long long> arr = {3, 1, 2, 4};
    std::cout << sumOfSubarrayMinimums(arr) << std::endl;
    return 0;
}
