// Subset Check using a Hash Set
// Determines whether every element of arrayA also appears in arrayB (A ⊆ B).
// Time: O(n + m) — O(m) to build the set, O(n) to check membership
// Space: O(m) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

bool subsetCheck(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize

    // Phase 1: build the hash set from arrayB
    for (int valueB : arrayB) {
        hashSet.insert(valueB); // @step:add-to-set
    }

    // Phase 2: check each element of arrayA for membership in the hash set
    for (int valueA : arrayA) {
        if (hashSet.count(valueA)) {
            // valueA is present in arrayB — condition holds so far
            (void)valueA; // @step:subset-pass
        } else {
            // valueA is missing from arrayB — A is not a subset of B
            return false; // @step:subset-fail
        }
    }

    return true; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 3};
    std::vector<int> arrayB = {1, 2, 3, 4, 5};
    std::cout << subsetCheck(arrayA, arrayB) << "\n";
    return 0;
}
