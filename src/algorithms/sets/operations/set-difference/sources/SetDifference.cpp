// Set Difference using a Hash Set
// Returns all elements in arrayA that are NOT in arrayB (A \ B).
// Time: O(n + m) — O(m) to build the set, O(n) to filter
// Space: O(m) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> setDifference(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize
    std::vector<int> result;         // @step:initialize

    // Phase 1: build the hash set from array B
    for (int valueB : arrayB) {
        hashSet.insert(valueB); // @step:add-to-set
    }

    // Phase 2: include only elements of array A not found in the hash set
    for (int valueA : arrayA) {
        if (hashSet.count(valueA)) {
            // valueA exists in B — exclude from result
            (void)valueA; // @step:skip-element
        } else {
            // valueA is only in A — include in result
            result.push_back(valueA); // @step:add-to-result
        }
    }

    return result; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 3, 4, 5};
    std::vector<int> arrayB = {3, 4, 5, 6};
    auto result = setDifference(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
