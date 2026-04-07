// Multiset Union (Bag Union) using frequency Maps
// For each element, take the MAX count from arrayA and arrayB.
// Time: O(n + m) — one pass over each array plus iteration over unique keys
// Space: O(n + m) for the two frequency maps

#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>

std::vector<int> multisetUnion(std::vector<int> arrayA, std::vector<int> arrayB) {
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

    // Phase 3: for each unique element take max(countA, countB) copies
    std::unordered_set<int> allKeys;
    for (auto& [key, val] : countsA) allKeys.insert(key);
    for (auto& [key, val] : countsB) allKeys.insert(key);

    for (int value : allKeys) {
        int countA = countsA.count(value) ? countsA[value] : 0;
        int countB = countsB.count(value) ? countsB[value] : 0;
        int maxCount = std::max(countA, countB); // @step:compare-count
        for (int copyIdx = 0; copyIdx < maxCount; copyIdx++) {
            result.push_back(value); // @step:add-to-result
        }
    }

    std::sort(result.begin(), result.end());
    return result; // @step:complete
}

int main() {
    std::vector<int> arrayA = {1, 2, 2, 3};
    std::vector<int> arrayB = {2, 3, 3, 4};
    auto result = multisetUnion(arrayA, arrayB);
    for (int val : result) std::cout << val << " ";
    std::cout << "\n";
    return 0;
}
