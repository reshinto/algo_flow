// Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
// Supports sub-linear space frequency estimation with one-sided error (never undercounts).
// Time: O(d) per insert/query — Space: O(d × w)

#include <iostream>
#include <vector>
#include <climits>
#include <cstdlib>

int computeSketchHash(int value, int hashIdx, int width) {
    return std::abs((value * (hashIdx * 1327 + 31) + hashIdx * 7919) % width); // @step:hash-element
}

struct EstimatedResult {
    int value;
    int estimatedCount;
};

std::vector<EstimatedResult> countMinSketch(
    std::vector<int> elements,
    std::vector<int> queries,
    int width,
    int depth
) {
    // Initialize d×w counter matrix with all zeros
    std::vector<std::vector<int>> sketch(depth, std::vector<int>(width, 0)); // @step:initialize

    // Insert phase: for each element, increment d counters
    for (int element : elements) {
        for (int hashIdx = 0; hashIdx < depth; hashIdx++) {
            int col = computeSketchHash(element, hashIdx, width);
            sketch[hashIdx][col]++; // @step:increment-count
        }
    }

    // Query phase: estimate frequency by taking minimum across all d rows
    std::vector<EstimatedResult> results;
    for (int query : queries) {
        int minCount = INT_MAX; // @step:check-membership
        for (int hashIdx = 0; hashIdx < depth; hashIdx++) {
            int col = computeSketchHash(query, hashIdx, width);
            if (sketch[hashIdx][col] < minCount) {
                minCount = sketch[hashIdx][col];
            }
        }
        int estimatedCount = (minCount == INT_MAX) ? 0 : minCount;
        if (estimatedCount > 0) {
            results.push_back({query, estimatedCount}); // @step:member-found
        }
        // @step:member-not-found (implicit when estimatedCount == 0)
    }

    return results; // @step:complete
}

int main() {
    std::vector<int> elements = {1, 2, 1, 3, 2, 1};
    std::vector<int> queries = {1, 2, 3, 4};
    auto results = countMinSketch(elements, queries, 10, 3);
    for (auto& result : results) {
        std::cout << "value=" << result.value << " count=" << result.estimatedCount << "\n";
    }
    return 0;
}
