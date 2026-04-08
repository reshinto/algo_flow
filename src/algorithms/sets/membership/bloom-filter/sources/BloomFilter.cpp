// Bloom Filter — Probabilistic Membership Data Structure
// Uses k hash functions to map elements into a bit array of size m.
// Insert: set k bit positions to 1. Query: check if all k positions are 1.
// False positives possible; false negatives impossible.
// Time: O(k) per operation — Space: O(m) for the bit array

#include <iostream>
#include <vector>
#include <cstdlib>

std::vector<int> computeHashPositions(int value, int hashCount, int size) {
    std::vector<int> positions;
    for (int hashIdx = 0; hashIdx < hashCount; hashIdx++) {
        int hash = std::abs((value * (hashIdx + 1) * 31 + hashIdx * 17) % size);
        positions.push_back(hash);
    }
    return positions;
}

struct QueryResult {
    int value;
    bool found;
};

std::vector<QueryResult> bloomFilter(
    std::vector<int> elements,
    std::vector<int> queries,
    int size,
    int hashCount
) {
    std::vector<int> bitArray(size, 0); // @step:initialize

    // Insert phase: hash each element and set its bit positions
    for (int element : elements) {
        auto positions = computeHashPositions(element, hashCount, size); // @step:hash-element
        for (int position : positions) {
            bitArray[position] = 1; // @step:set-bit
        }
    }

    std::vector<QueryResult> results;

    // Query phase: check if all bit positions for a query value are set
    for (int query : queries) {
        auto positions = computeHashPositions(query, hashCount, size); // @step:check-bit
        bool allBitsSet = true;
        for (int position : positions) {
            if (bitArray[position] != 1) {
                allBitsSet = false;
                break;
            }
        }

        if (allBitsSet) {
            results.push_back({query, true}); // @step:member-found
        } else {
            results.push_back({query, false}); // @step:member-not-found
        }
    }

    return results; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> elements = {1, 2, 3, 4, 5};
    std::vector<int> queries = {3, 6};
    auto results = bloomFilter(elements, queries, 20, 3);
    for (auto& result : results) {
        std::cout << "value=" << result.value << " found=" << result.found << "\n";
    }
    return 0;
}
#endif
