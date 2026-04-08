// Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates
#include <vector>
using namespace std;

class BinaryIndexedTree {
    int arrayLength;
    vector<int> bit;

    void update(int bitIndex, int delta) {
        while (bitIndex <= arrayLength) {
            bit[bitIndex] += delta; // @step:update-segment
            bitIndex += bitIndex & -bitIndex;
        }
    }

    int prefixSum(int bitIndex) {
        int totalSum = 0;
        while (bitIndex > 0) {
            totalSum += bit[bitIndex]; // @step:compute-prefix
            bitIndex -= bitIndex & -bitIndex;
        }
        return totalSum; // @step:compute-prefix
    }

public:
    vector<int> binaryIndexedTree(vector<int> array, vector<pair<int,int>> queries) {
        arrayLength = array.size(); // @step:initialize
        bit.assign(arrayLength + 1, 0); // @step:initialize

        // Build BIT from array (1-indexed)
        for (int pos = 0; pos < arrayLength; pos++) {
            update(pos + 1, array[pos]); // @step:update-segment
        }

        vector<int> results;
        for (auto& [queryLow, queryHigh] : queries) {
            // Range sum [queryLow, queryHigh] = prefix[queryHigh+1] - prefix[queryLow]
            int rangeSumResult = prefixSum(queryHigh + 1) - prefixSum(queryLow); // @step:query-range
            results.push_back(rangeSumResult);
        }
        return results; // @step:complete
    }
};
