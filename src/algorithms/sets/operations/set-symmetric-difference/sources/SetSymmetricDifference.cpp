// Set Symmetric Difference using a Hash Set
// Returns all elements in either arrayA or arrayB, but NOT in both (A △ B).
// Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
// Space: O(n) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> setSymmetricDifference(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize
    std::vector<int> result;         // @step:initialize

    // Phase 1: build the hash set from array A
    for (int valueA : arrayA) {
        hashSet.insert(valueA); // @step:add-to-set
    }

    // Phase 2: process array B — remove common elements, add unique ones to result
    for (int valueB : arrayB) {
        if (hashSet.count(valueB)) {
            // valueB is in both arrays — remove it (common element, excluded from result)
            hashSet.erase(valueB); // @step:skip-element
        } else {
            // valueB is only in B — add to result
            result.push_back(valueB); // @step:add-to-result
        }
    }

    // Phase 3: remaining elements in hash set are only in A — add to result
    for (int remaining : hashSet) {
        result.push_back(remaining); // @step:add-to-result
    }

    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> arrayA = {1, 2, 3, 4};
    std::vector<int> arrayB = {3, 4, 5, 6};
    auto result = setSymmetricDifference(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
#endif
