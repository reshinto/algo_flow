// Tribonacci memoization — top-down recursion with cached subproblems

#include <iostream>
#include <unordered_map>

int tribonacciMemoization(int targetIndex, std::unordered_map<int, int>& memo) {
    // @step:initialize
    if (targetIndex == 0) return 0; // @step:initialize
    if (targetIndex <= 2) return 1; // @step:initialize
    auto it = memo.find(targetIndex);
    if (it != memo.end()) return it->second; // @step:read-cache
    // Recursively compute the three preceding subproblems and cache the result
    int result = tribonacciMemoization(targetIndex - 1, memo) // @step:compute-cell
               + tribonacciMemoization(targetIndex - 2, memo) // @step:compute-cell
               + tribonacciMemoization(targetIndex - 3, memo); // @step:compute-cell
    memo[targetIndex] = result; // @step:compute-cell
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::unordered_map<int, int> memo;
    int targetIndex = 7;
    int result = tribonacciMemoization(targetIndex, memo);
    std::cout << "Tribonacci(" << targetIndex << ") = " << result << std::endl;
    return 0;
}
#endif
