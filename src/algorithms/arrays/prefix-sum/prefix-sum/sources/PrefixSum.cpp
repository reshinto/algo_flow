// Prefix Sum — O(n) build, O(1) per query via prefix difference
#include <vector>
#include <utility>

std::pair<std::vector<int>, std::vector<int>> prefixSum(
    const std::vector<int>& inputArray,
    const std::vector<std::pair<int,int>>& queries) {

    std::vector<int> prefixArray(inputArray.size() + 1, 0); // @step:initialize

    // Build prefix sum array where prefixArray[i] = sum of inputArray[0..i-1]
    for (int scanIndex = 0; scanIndex < (int)inputArray.size(); scanIndex++) { // @step:visit
        prefixArray[scanIndex + 1] = prefixArray[scanIndex] + inputArray[scanIndex]; // @step:visit
    }

    std::vector<int> queryResults; // @step:compare

    // Answer range queries in O(1) each using prefix difference
    for (int queryIndex = 0; queryIndex < (int)queries.size(); queryIndex++) {
        int leftBound = queries[queryIndex].first;
        int rightBound = queries[queryIndex].second;
        int rangeSum = prefixArray[rightBound + 1] - prefixArray[leftBound]; // @step:compare
        queryResults.push_back(rangeSum); // @step:compare
    }

    std::vector<int> result(prefixArray.begin() + 1, prefixArray.end());
    return {result, queryResults}; // @step:complete
}
