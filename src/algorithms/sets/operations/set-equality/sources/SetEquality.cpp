// Set Equality using a Hash Set
// Determines whether arrayA and arrayB contain exactly the same unique elements (A = B).
// Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
// Time: O(n + m) — O(n) to build the set, O(m) to check membership
// Space: O(n) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

bool setEquality(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_set<int> hashSet; // @step:initialize
    int uniqueCountA = 0;

    // Phase 1: build the hash set from arrayA, counting unique elements
    for (int valueA : arrayA) {
        if (!hashSet.count(valueA)) {
            uniqueCountA++;
        }
        hashSet.insert(valueA); // @step:add-to-set
    }

    // Phase 2: check each element of arrayB for membership; count unique elements in B
    int uniqueCountB = 0;
    std::unordered_set<int> seenInB;

    for (int valueB : arrayB) {
        if (!seenInB.count(valueB)) {
            uniqueCountB++;
            seenInB.insert(valueB);
        }

        if (hashSet.count(valueB)) {
            // valueB is present in arrayA — A ⊇ {valueB} holds so far
            (void)valueB; // @step:subset-pass
        } else {
            // valueB is missing from arrayA — sets cannot be equal
            return false; // @step:subset-fail
        }
    }

    // Equal iff all B elements are in A and both have the same unique count
    bool isEqual = (uniqueCountA == uniqueCountB);
    return isEqual; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 3};
    std::vector<int> arrayB = {3, 1, 2};
    std::cout << setEquality(arrayA, arrayB) << "\n";
    return 0;
}
