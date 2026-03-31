// Reorganize String — rearrange string so no two adjacent characters are the same (LeetCode 767)
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReorganizeString {
    private static void siftUp(List<int[]> arr, int currentIdx) {
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (arr.get(parentIdx)[0] >= arr.get(currentIdx)[0]) break; // @step:compare
            int[] swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(currentIdx)); // @step:heap-swap
            arr.set(currentIdx, swapTemp); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    }

    private static void siftDown(List<int[]> arr, int parentIdx) {
        while (true) {
            int largestIdx = parentIdx; // @step:sift-down
            int leftIdx = 2 * parentIdx + 1; // @step:sift-down
            int rightIdx = 2 * parentIdx + 2; // @step:sift-down
            if (leftIdx < arr.size() && arr.get(leftIdx)[0] > arr.get(largestIdx)[0]) { // @step:compare
                largestIdx = leftIdx; // @step:sift-down
            }
            if (rightIdx < arr.size() && arr.get(rightIdx)[0] > arr.get(largestIdx)[0]) { // @step:compare
                largestIdx = rightIdx; // @step:sift-down
            }
            if (largestIdx == parentIdx) break; // @step:sift-down
            int[] swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(largestIdx)); // @step:heap-swap
            arr.set(largestIdx, swapTemp); // @step:heap-swap
            parentIdx = largestIdx; // @step:sift-down
        }
    }

    public static String reorganizeString(String text) {
        Map<Character, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        for (char character : text.toCharArray()) { // @step:initialize
            frequencyMap.put(character, frequencyMap.getOrDefault(character, 0) + 1);
        }

        List<int[]> heap = new ArrayList<>(); // @step:initialize
        for (Map.Entry<Character, Integer> entry : frequencyMap.entrySet()) {
            heap.add(new int[]{entry.getValue(), entry.getKey()}); // @step:heap-insert
        }

        // Heapify
        for (int startIdx = heap.size() / 2 - 1; startIdx >= 0; startIdx--) { // @step:sift-down
            siftDown(heap, startIdx);
        }

        StringBuilder result = new StringBuilder(); // @step:initialize
        int[] prevEntry = null; // @step:initialize

        while (!heap.isEmpty()) {
            int[] topEntry = heap.get(0); // @step:heap-extract
            int lastIdx = heap.size() - 1; // @step:heap-extract
            heap.set(0, heap.get(lastIdx)); // @step:heap-swap
            heap.remove(lastIdx); // @step:heap-extract
            if (!heap.isEmpty()) siftDown(heap, 0); // @step:sift-down

            result.append((char) topEntry[1]); // @step:heap-extract
            topEntry[0] -= 1; // @step:heap-extract

            if (prevEntry != null && prevEntry[0] > 0) { // @step:compare
                heap.add(prevEntry); // @step:heap-insert
                siftUp(heap, heap.size() - 1);
            }

            prevEntry = topEntry[0] > 0 ? topEntry : null; // @step:compare

            if (heap.isEmpty() && prevEntry != null) {
                return ""; // @step:complete
            }
        }

        return result.toString(); // @step:complete
    }
}
