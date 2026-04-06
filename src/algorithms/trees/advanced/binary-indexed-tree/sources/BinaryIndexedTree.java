// Binary Indexed Tree (Fenwick Tree) — prefix sum queries and point updates
import java.util.ArrayList;
import java.util.List;

class BinaryIndexedTree {
    private int[] bit;
    private int n;

    private void update(int bitIdx, int delta) {
        while (bitIdx <= n) {
            bit[bitIdx] += delta; // @step:update-segment
            bitIdx += bitIdx & (-bitIdx);
        }
    }

    private int prefixSum(int bitIdx) {
        int total = 0;
        while (bitIdx > 0) {
            total += bit[bitIdx]; // @step:compute-prefix
            bitIdx -= bitIdx & (-bitIdx);
        }
        return total; // @step:compute-prefix
    }

    public List<Integer> binaryIndexedTree(int[] array, int[][] queries) {
        n = array.length; // @step:initialize
        bit = new int[n + 1]; // @step:initialize
        for (int pos = 0; pos < n; pos++) {
            update(pos + 1, array[pos]); // @step:update-segment
        }
        List<Integer> results = new ArrayList<>();
        for (int[] query : queries) {
            int rangeSum = prefixSum(query[1] + 1) - prefixSum(query[0]); // @step:query-range
            results.add(rangeSum);
        }
        return results; // @step:complete
    }
}
