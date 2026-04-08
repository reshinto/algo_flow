// Set Union using a Hash Set
// Returns all unique elements from both arrayA and arrayB.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n + m) for the hash set and result

#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> setUnion(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize
    std::vector<int> result;         // @step:initialize

    // Phase 1: add all elements of array A to hash set and result
    for (int valueA : arrayA) {
        hashSet.insert(valueA); // @step:add-to-set
        result.push_back(valueA);
    }

    // Phase 2: add elements of array B that are not already in the hash set
    for (int valueB : arrayB) {
        if (hashSet.count(valueB)) {
            // valueB already in result — skip
            (void)valueB; // @step:skip-element
        } else {
            // valueB is only in array B — add to result
            result.push_back(valueB); // @step:add-to-result
        }
    }

    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> arrayA = {1, 2, 3};
    std::vector<int> arrayB = {3, 4, 5};
    auto result = setUnion(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
#endif
