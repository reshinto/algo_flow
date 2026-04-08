// Set Intersection using a Hash Set
// Returns all elements that appear in both arrayA and arrayB (no duplicates).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> setIntersection(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize
    std::vector<int> result;         // @step:initialize

    // Phase 1: build the hash set from array A
    for (int valueA : arrayA) {
        hashSet.insert(valueA); // @step:add-to-set
    }

    // Phase 2: check each element of array B for membership
    for (int valueB : arrayB) {
        if (hashSet.count(valueB)) {
            // valueB is in both arrays
            result.push_back(valueB); // @step:member-found
            hashSet.erase(valueB); // prevent duplicate results
        } else {
            // valueB is only in array B
            (void)valueB; // @step:member-not-found
        }
    }

    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> arrayA = {1, 2, 3, 4};
    std::vector<int> arrayB = {3, 4, 5, 6};
    auto result = setIntersection(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
#endif
