// Set Complement using a Hash Set
// Returns all elements in the universal set U that are NOT in set A.
// Complement = U \ A
// Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
// Space: O(n) for the hash set

#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> setComplement(std::vector<int> arrayA, std::vector<int> universalSet) {
    std::unordered_set<int> hashSet; // @step:initialize
    std::vector<int> result;         // @step:initialize

    // Phase 1: build the hash set from array A
    for (int valueA : arrayA) {
        hashSet.insert(valueA); // @step:add-to-set
    }

    // Phase 2: collect elements in the universal set that are NOT in A
    for (int valueU : universalSet) {
        if (hashSet.count(valueU)) {
            // valueU is in A, so skip it
            (void)valueU; // @step:skip-element
        } else {
            // valueU is not in A — it belongs to the complement
            result.push_back(valueU); // @step:add-to-result
        }
    }

    return result; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 3};
    std::vector<int> universalSet = {1, 2, 3, 4, 5};
    auto result = setComplement(arrayA, universalSet);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
