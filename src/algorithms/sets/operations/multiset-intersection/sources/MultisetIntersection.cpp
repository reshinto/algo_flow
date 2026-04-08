// Multiset Intersection (Bag Intersection) using frequency Maps
// For each element, take the MIN count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over shared keys
// Space: O(n + m) for the two frequency maps

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

std::vector<int> multisetIntersection(std::vector<int> arrayA, std::vector<int> arrayB) {
    std::unordered_map<int, int> countsA; // @step:initialize
    std::unordered_map<int, int> countsB; // @step:initialize
    std::vector<int> result;              // @step:initialize

    // Phase 1: count frequencies in arrayA
    for (int valueA : arrayA) {
        countsA[valueA]++; // @step:count-element
    }

    // Phase 2: count frequencies in arrayB
    for (int valueB : arrayB) {
        countsB[valueB]++; // @step:count-element
    }

    // Phase 3: for each element in A, take min(countA, countB) copies
    for (auto& [value, countA] : countsA) {
        int countB = countsB.count(value) ? countsB[value] : 0;
        int minCount = std::min(countA, countB); // @step:compare-count
        for (int copyIdx = 0; copyIdx < minCount; copyIdx++) {
            result.push_back(value); // @step:add-to-result
        }
    }

    std::sort(result.begin(), result.end());
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> arrayA = {1, 2, 2, 3, 3, 3};
    std::vector<int> arrayB = {2, 2, 3, 4};
    auto result = multisetIntersection(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
#endif
