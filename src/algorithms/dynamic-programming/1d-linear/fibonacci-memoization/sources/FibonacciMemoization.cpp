// Fibonacci memoization — top-down recursion with cached subproblems

#include <iostream>
#include <unordered_map>

int fibonacciMemoization(int targetIndex, std::unordered_map<int, int>& memo) {
    // @step:initialize
    if (targetIndex <= 1) return targetIndex; // @step:initialize
    auto it = memo.find(targetIndex);
    if (it != memo.end()) return it->second; // @step:read-cache
    // Recursively compute subproblems and cache the result to avoid recomputation
    int result = fibonacciMemoization(targetIndex - 1, memo) // @step:compute-cell
               + fibonacciMemoization(targetIndex - 2, memo); // @step:compute-cell
    memo[targetIndex] = result; // @step:compute-cell
    return result; // @step:complete
}

int main() {
    std::unordered_map<int, int> memo;
    int targetIndex = 8;
    int result = fibonacciMemoization(targetIndex, memo);
    std::cout << "Fibonacci(" << targetIndex << ") = " << result << std::endl;
    return 0;
}
