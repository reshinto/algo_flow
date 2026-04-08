// LIS (Longest Increasing Subsequence) memoization — top-down recursion with cached subproblems

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

int lis(const std::vector<int>& sequence, int startIndex, std::unordered_map<int, int>& memo) {
    auto it = memo.find(startIndex);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    int maxLength = 1; // @step:compute-cell
    int sequenceLength = sequence.size();
    for (int nextIndex = startIndex + 1; nextIndex < sequenceLength; nextIndex++) {
        // @step:compute-cell
        if (sequence[nextIndex] > sequence[startIndex]) {
            // @step:compute-cell
            int subLength = 1 + lis(sequence, nextIndex, memo); // @step:compute-cell
            if (subLength > maxLength) {
                // @step:compute-cell
                maxLength = subLength; // @step:compute-cell
            }
        }
    }
    memo[startIndex] = maxLength; // @step:compute-cell
    return maxLength; // @step:pop-call
}

int lisMemoization(const std::vector<int>& sequence) {
    // @step:initialize
    int sequenceLength = sequence.size(); // @step:initialize
    if (sequenceLength == 0) return 0; // @step:initialize
    std::unordered_map<int, int> memo; // @step:initialize
    int result = 0; // @step:compute-cell
    for (int startIndex = 0; startIndex < sequenceLength; startIndex++) {
        // @step:compute-cell
        int lisLength = lis(sequence, startIndex, memo); // @step:compute-cell
        if (lisLength > result) {
            // @step:compute-cell
            result = lisLength; // @step:compute-cell
        }
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> sequence = {10, 9, 2, 5, 3, 7, 101, 18};
    int result = lisMemoization(sequence);
    std::cout << "LIS length: " << result << std::endl;
    return 0;
}
#endif
