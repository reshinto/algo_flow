// Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
#include <vector>
#include <utility>

std::pair<int, int> boyerMooreVoting(const std::vector<int>& inputArray) {
    if (inputArray.empty()) {
        // @step:initialize
        return {-1, 0}; // @step:initialize
    }

    int candidate = inputArray[0]; // @step:initialize
    int voteCount = 0; // @step:initialize

    // Phase 1: Find candidate using cancellation
    for (int elementIndex = 0; elementIndex < (int)inputArray.size(); elementIndex++) {
        int currentElement = inputArray[elementIndex]; // @step:visit

        if (voteCount == 0) { // @step:compare
            candidate = currentElement; // @step:compare
            voteCount = 1; // @step:compare
        } else if (currentElement == candidate) {
            voteCount++; // @step:visit
        } else {
            voteCount--; // @step:visit
        }
    }

    return {candidate, voteCount}; // @step:complete
}
