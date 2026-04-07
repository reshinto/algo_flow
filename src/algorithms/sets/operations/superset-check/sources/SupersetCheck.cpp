// Superset Check using a Hash Set
// Determines whether every element of arrayB also appears in arrayA (A ⊇ B).
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

bool supersetCheck(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize

    // Phase 1: build the hash set from arrayA
    for (int valueA : arrayA) {
        hashSet.insert(valueA); // @step:add-to-set
    }

    // Phase 2: check each element of arrayB for membership in the hash set
    for (int valueB : arrayB) {
        if (hashSet.count(valueB)) {
            // valueB is present in arrayA — condition holds so far
            (void)valueB; // @step:subset-pass
        } else {
            // valueB is missing from arrayA — A is not a superset of B
            return false; // @step:subset-fail
        }
    }

    return true; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 3, 4, 5};
    std::vector<int> arrayB = {1, 2, 3};
    std::cout << supersetCheck(arrayA, arrayB) << "\n";
    return 0;
}
