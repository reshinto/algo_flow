// Segment Tree — build from array then query range sums
import java.util.ArrayList;
import java.util.List;

class SegmentTreeRangeSum {
    private int[] segTree;
    private int n;

    private void build(int[] array, int nodeIdx, int low, int high) {
        if (low == high) {
            segTree[nodeIdx] = array[low]; // @step:build-node
            return;
        }
        int mid = (low + high) / 2;
        build(array, 2 * nodeIdx, low, mid); // @step:traverse-left
        build(array, 2 * nodeIdx + 1, mid + 1, high); // @step:traverse-right
        segTree[nodeIdx] = segTree[2 * nodeIdx] + segTree[2 * nodeIdx + 1]; // @step:update-segment
    }

    private int query(int nodeIdx, int low, int high, int qLow, int qHigh) {
        if (qLow > high || qHigh < low) return 0; // @step:query-range
        if (qLow <= low && high <= qHigh) return segTree[nodeIdx]; // @step:query-range
        int mid = (low + high) / 2;
        int leftSum = query(2 * nodeIdx, low, mid, qLow, qHigh); // @step:traverse-left
        int rightSum = query(2 * nodeIdx + 1, mid + 1, high, qLow, qHigh); // @step:traverse-right
        return leftSum + rightSum; // @step:query-range
    }

    public List<Integer> segmentTreeRangeSum(int[] array, int[][] queries) {
        n = array.length; // @step:initialize
        segTree = new int[4 * n]; // @step:initialize
        build(array, 1, 0, n - 1); // @step:build-node
        List<Integer> results = new ArrayList<>();
        for (int[] query : queries) {
            results.add(query(1, 0, n - 1, query[0], query[1])); // @step:query-range
        }
        return results; // @step:complete
    }
}
