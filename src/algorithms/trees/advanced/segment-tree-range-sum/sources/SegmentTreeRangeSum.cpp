// Segment Tree — build from array then query range sums
#include <vector>
using namespace std;

class SegmentTreeRangeSum {
    int arrayLength;
    vector<long long> segTree;

    void buildNode(vector<int>& array, int nodeIndex, int low, int high) {
        if (low == high) {
            segTree[nodeIndex] = array[low]; // @step:build-node
            return;
        }
        int mid = (low + high) / 2;
        buildNode(array, 2 * nodeIndex, low, mid);          // @step:traverse-left
        buildNode(array, 2 * nodeIndex + 1, mid + 1, high); // @step:traverse-right
        segTree[nodeIndex] = segTree[2 * nodeIndex] + segTree[2 * nodeIndex + 1]; // @step:update-segment
    }

    long long queryRange(int nodeIndex, int low, int high, int qLow, int qHigh) {
        if (qLow > high || qHigh < low) return 0; // @step:query-range
        if (qLow <= low && high <= qHigh) return segTree[nodeIndex]; // @step:query-range
        int mid = (low + high) / 2;
        long long leftSum = queryRange(2 * nodeIndex, low, mid, qLow, qHigh);          // @step:traverse-left
        long long rightSum = queryRange(2 * nodeIndex + 1, mid + 1, high, qLow, qHigh); // @step:traverse-right
        return leftSum + rightSum; // @step:query-range
    }

public:
    vector<long long> segmentTreeRangeSum(vector<int> array, vector<pair<int,int>> queries) {
        arrayLength = array.size(); // @step:initialize
        segTree.assign(4 * arrayLength, 0); // @step:initialize

        buildNode(array, 1, 0, arrayLength - 1); // @step:build-node

        vector<long long> results;
        for (auto& [qLow, qHigh] : queries) {
            results.push_back(queryRange(1, 0, arrayLength - 1, qLow, qHigh)); // @step:query-range
        }
        return results; // @step:complete
    }
};
