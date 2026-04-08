// Segment Tree — build from array then query range minimums
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class SegmentTreeRangeMin {
    int arrayLength;
    vector<int> segTree;

    void buildNode(vector<int>& array, int nodeIndex, int low, int high) {
        if (low == high) {
            segTree[nodeIndex] = array[low]; // @step:build-node
            return;
        }
        int mid = (low + high) / 2;
        buildNode(array, 2 * nodeIndex, low, mid);          // @step:traverse-left
        buildNode(array, 2 * nodeIndex + 1, mid + 1, high); // @step:traverse-right
        segTree[nodeIndex] = min(segTree[2 * nodeIndex], segTree[2 * nodeIndex + 1]); // @step:update-segment
    }

    int queryMin(int nodeIndex, int low, int high, int qLow, int qHigh) {
        if (qLow > high || qHigh < low) return INT_MAX; // @step:query-range
        if (qLow <= low && high <= qHigh) return segTree[nodeIndex]; // @step:query-range
        int mid = (low + high) / 2;
        int leftMin = queryMin(2 * nodeIndex, low, mid, qLow, qHigh);          // @step:traverse-left
        int rightMin = queryMin(2 * nodeIndex + 1, mid + 1, high, qLow, qHigh); // @step:traverse-right
        return min(leftMin, rightMin); // @step:query-range
    }

public:
    vector<int> segmentTreeRangeMin(vector<int> array, vector<pair<int,int>> queries) {
        arrayLength = array.size(); // @step:initialize
        segTree.assign(4 * arrayLength, INT_MAX); // @step:initialize

        buildNode(array, 1, 0, arrayLength - 1); // @step:build-node

        vector<int> results;
        for (auto& [qLow, qHigh] : queries) {
            results.push_back(queryMin(1, 0, arrayLength - 1, qLow, qHigh)); // @step:query-range
        }
        return results; // @step:complete
    }
};
