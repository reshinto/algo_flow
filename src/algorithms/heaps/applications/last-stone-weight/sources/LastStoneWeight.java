// Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
import java.util.ArrayList;
import java.util.List;

public class LastStoneWeight {
    private static void siftDown(List<Integer> arr, int parentIdx) {
        while (true) {
            int largestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < arr.size() && arr.get(leftIdx) > arr.get(largestIdx)) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < arr.size() && arr.get(rightIdx) > arr.get(largestIdx)) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            int swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(largestIdx)); // @step:heap-swap
            arr.set(largestIdx, swapTemp); // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    private static int extractMax(List<Integer> arr) {
        int maxValue = arr.get(0); // @step:heap-extract
        int lastIdx = arr.size() - 1; // @step:heap-extract
        arr.set(0, arr.get(lastIdx)); // @step:heap-swap
        arr.remove(lastIdx); // @step:heap-extract
        if (!arr.isEmpty()) siftDown(arr, 0); // @step:sift-down
        return maxValue;
    }

    private static void insertValue(List<Integer> arr, int value) {
        arr.add(value); // @step:heap-insert
        int currentIdx = arr.size() - 1; // @step:sift-up
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (arr.get(parentIdx) >= arr.get(currentIdx)) break; // @step:compare
            int swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(currentIdx)); // @step:heap-swap
            arr.set(currentIdx, swapTemp); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    }

    public static int lastStoneWeight(int[] stones) {
        List<Integer> heap = new ArrayList<>(); // @step:initialize
        for (int stone : stones) heap.add(stone);
        // Build max-heap
        for (int startIdx = heap.size() / 2 - 1; startIdx >= 0; startIdx--) { // @step:sift-down
            siftDown(heap, startIdx); // @step:sift-down
        }
        while (heap.size() >= 2) {
            int heaviest = extractMax(heap); // @step:heap-extract
            int secondHeaviest = extractMax(heap); // @step:heap-extract
            if (heaviest != secondHeaviest) { // @step:compare
                insertValue(heap, heaviest - secondHeaviest); // @step:heap-insert
            }
        }
        return heap.isEmpty() ? 0 : heap.get(0); // @step:complete
    }
}
