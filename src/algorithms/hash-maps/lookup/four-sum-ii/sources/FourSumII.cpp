// Four Sum II — count tuples (i,j,k,l) such that A[i]+B[j]+C[k]+D[l] == 0
#include <vector>
#include <unordered_map>

int fourSumII(
    const std::vector<int>& numsA,
    const std::vector<int>& numsB,
    const std::vector<int>& numsC,
    const std::vector<int>& numsD
) {
    std::unordered_map<int, int> pairSumCounts; // @step:initialize

    // Phase 1: build map of all A+B pair sums with their occurrence counts
    for (int outerVal : numsA) {
        for (int innerVal : numsB) {
            int pairSum = outerVal + innerVal;
            if (pairSumCounts.count(pairSum)) {
                pairSumCounts[pairSum]++; // @step:increment-count
            } else {
                pairSumCounts[pairSum] = 1; // @step:insert-key
            }
        }
    }

    // Phase 2: for each C+D pair, check if its negation exists in the map
    int tupleCount = 0;
    for (int outerVal : numsC) {
        for (int innerVal : numsD) {
            int complement = -(outerVal + innerVal);
            auto it = pairSumCounts.find(complement);
            if (it != pairSumCounts.end()) {
                // @step:key-found
                tupleCount += it->second; // @step:key-found
            }
            // @step:key-not-found
        }
    }

    return tupleCount; // @step:complete
}
