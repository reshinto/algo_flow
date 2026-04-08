// XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
#include <vector>
#include <utility>

std::pair<std::vector<int>, std::vector<int>> xorRangeQuery(
    const std::vector<int>& inputArray,
    const std::vector<std::pair<int,int>>& queries) {

    std::vector<int> prefixXor(inputArray.size() + 1, 0); // @step:initialize

    // Build prefix XOR array where prefixXor[i] = XOR of inputArray[0..i-1]
    for (int buildIndex = 0; buildIndex < (int)inputArray.size(); buildIndex++) { // @step:visit
        prefixXor[buildIndex + 1] = prefixXor[buildIndex] ^ inputArray[buildIndex]; // @step:visit
    }

    std::vector<int> queryResults; // @step:compare

    // Answer range XOR queries in O(1) each using prefix XOR difference
    for (int queryIndex = 0; queryIndex < (int)queries.size(); queryIndex++) {
        int leftBound = queries[queryIndex].first;
        int rightBound = queries[queryIndex].second;
        int rangeXor = prefixXor[rightBound + 1] ^ prefixXor[leftBound]; // @step:compare
        queryResults.push_back(rangeXor); // @step:compare
    }

    std::vector<int> resultXor(prefixXor.begin() + 1, prefixXor.end());
    return {resultXor, queryResults}; // @step:complete
}
