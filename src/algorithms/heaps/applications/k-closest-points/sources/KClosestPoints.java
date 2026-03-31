// K Closest Points to Origin — use a max-heap of size k (by distance²) to find the k nearest points
import java.util.ArrayList;
import java.util.List;

public class KClosestPoints {
    private static long distanceSquared(int[] point) {
        return (long) point[0] * point[0] + (long) point[1] * point[1]; // @step:initialize
    }

    private static void siftUp(long[] distHeap, int[][] pointHeap, int idx) {
        int currentIdx = idx; // @step:sift-up
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (distHeap[currentIdx] > distHeap[parentIdx]) { // @step:compare
                long tempDist = distHeap[currentIdx]; // @step:heap-swap
                distHeap[currentIdx] = distHeap[parentIdx]; // @step:heap-swap
                distHeap[parentIdx] = tempDist; // @step:heap-swap
                int[] tempPoint = pointHeap[currentIdx]; // @step:heap-swap
                pointHeap[currentIdx] = pointHeap[parentIdx]; // @step:heap-swap
                pointHeap[parentIdx] = tempPoint; // @step:heap-swap
                currentIdx = parentIdx; // @step:sift-up
            } else {
                break; // @step:compare
            }
        }
    }

    private static void siftDown(long[] distHeap, int[][] pointHeap, int heapSize, int startIdx) {
        int parentIdx = startIdx; // @step:sift-down
        while (true) {
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            int largestIdx = parentIdx; // @step:sift-down
            if (leftIdx < heapSize && distHeap[leftIdx] > distHeap[largestIdx]) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < heapSize && distHeap[rightIdx] > distHeap[largestIdx]) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            long swapDist = distHeap[parentIdx]; // @step:heap-swap
            distHeap[parentIdx] = distHeap[largestIdx]; // @step:heap-swap
            distHeap[largestIdx] = swapDist; // @step:heap-swap
            int[] swapPoint = pointHeap[parentIdx]; // @step:heap-swap
            pointHeap[parentIdx] = pointHeap[largestIdx]; // @step:heap-swap
            pointHeap[largestIdx] = swapPoint; // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    public static int[][] kClosestPoints(int[][] points, int kValue) {
        long[] distHeap = new long[kValue]; // @step:initialize
        int[][] pointHeap = new int[kValue][]; // @step:initialize
        int heapSize = 0; // @step:initialize

        for (int[] point : points) {
            long dist = distanceSquared(point); // @step:heap-insert
            if (heapSize < kValue) {
                distHeap[heapSize] = dist; // @step:heap-insert
                pointHeap[heapSize] = point; // @step:heap-insert
                heapSize++; // @step:heap-insert
                siftUp(distHeap, pointHeap, heapSize - 1); // @step:sift-up
            } else if (dist < distHeap[0]) { // @step:heap-extract
                distHeap[0] = dist; // @step:heap-extract
                pointHeap[0] = point; // @step:heap-extract
                siftDown(distHeap, pointHeap, heapSize, 0); // @step:sift-down
            }
        }

        int[][] result = new int[heapSize][]; // @step:complete
        System.arraycopy(pointHeap, 0, result, 0, heapSize); // @step:complete
        return result; // @step:complete
    }
}
