// Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TaskSchedulerHeap {
    private static void siftUp(List<Integer> arr, int currentIdx) {
        while (currentIdx > 0) {
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (arr.get(parentIdx) >= arr.get(currentIdx)) break; // @step:compare
            int swapTemp = arr.get(parentIdx); // @step:heap-swap
            arr.set(parentIdx, arr.get(currentIdx)); // @step:heap-swap
            arr.set(currentIdx, swapTemp); // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
    }

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

    public static int taskSchedulerHeap(String[] tasks, int cooldown) {
        Map<String, Integer> frequencyMap = new HashMap<>(); // @step:initialize
        for (String taskName : tasks) { // @step:initialize
            frequencyMap.put(taskName, frequencyMap.getOrDefault(taskName, 0) + 1);
        }

        List<Integer> heap = new ArrayList<>(); // @step:initialize
        for (int frequency : frequencyMap.values()) {
            heap.add(frequency); // @step:heap-insert
        }

        // Heapify
        for (int startIdx = heap.size() / 2 - 1; startIdx >= 0; startIdx--) { // @step:sift-down
            siftDown(heap, startIdx);
        }

        int totalIntervals = 0; // @step:initialize

        while (!heap.isEmpty()) {
            int cycleSize = cooldown + 1; // @step:initialize
            List<Integer> roundTasks = new ArrayList<>(); // @step:initialize

            for (int slotIndex = 0; slotIndex < cycleSize && !heap.isEmpty(); slotIndex++) {
                int maxFrequency = heap.get(0); // @step:heap-extract
                int lastIdx = heap.size() - 1; // @step:heap-extract
                heap.set(0, heap.get(lastIdx)); // @step:heap-swap
                heap.remove(lastIdx); // @step:heap-extract
                if (!heap.isEmpty()) siftDown(heap, 0); // @step:sift-down
                roundTasks.add(maxFrequency - 1); // @step:compare
            }

            for (int remainingFrequency : roundTasks) { // @step:heap-insert
                if (remainingFrequency > 0) {
                    heap.add(remainingFrequency); // @step:heap-insert
                    siftUp(heap, heap.size() - 1);
                }
            }

            if (!heap.isEmpty()) {
                totalIntervals += cycleSize; // @step:compare
            } else {
                totalIntervals += roundTasks.size(); // @step:compare
            }
        }

        return totalIntervals; // @step:complete
    }
}
