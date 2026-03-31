// Meeting Rooms II — find minimum number of meeting rooms required using a min-heap of end times
import java.util.Arrays;

public class MeetingRoomsII {
    public static int meetingRoomsII(int[][] intervals) {
        if (intervals.length == 0) return 0; // @step:initialize
        // Sort meetings by start time
        int[][] sorted = intervals.clone(); // @step:initialize
        Arrays.sort(sorted, (meetingA, meetingB) -> meetingA[0] - meetingB[0]); // @step:initialize
        // Min-heap tracking end times of active meetings
        int[] endTimeHeap = new int[sorted.length]; // @step:initialize
        int heapSize = 0; // @step:initialize

        for (int[] meeting : sorted) {
            int startTime = meeting[0];
            int endTime = meeting[1];
            if (heapSize > 0 && endTimeHeap[0] <= startTime) {
                // A room is free — extract its end time and reuse the room
                endTimeHeap[0] = endTimeHeap[heapSize - 1]; // @step:heap-extract
                heapSize--; // @step:heap-extract
                // Sift down to restore min-heap property
                int parentIdx = 0; // @step:sift-down
                while (true) {
                    int smallestIdx = parentIdx; // @step:sift-down
                    int leftIdx = 2 * parentIdx + 1; // @step:sift-down
                    int rightIdx = 2 * parentIdx + 2; // @step:sift-down
                    if (leftIdx < heapSize && endTimeHeap[leftIdx] < endTimeHeap[smallestIdx]) { // @step:compare
                        smallestIdx = leftIdx;
                    }
                    if (rightIdx < heapSize && endTimeHeap[rightIdx] < endTimeHeap[smallestIdx]) { // @step:compare
                        smallestIdx = rightIdx;
                    }
                    if (smallestIdx == parentIdx) break; // @step:sift-down
                    int swapTemp = endTimeHeap[parentIdx]; // @step:heap-swap
                    endTimeHeap[parentIdx] = endTimeHeap[smallestIdx]; // @step:heap-swap
                    endTimeHeap[smallestIdx] = swapTemp; // @step:heap-swap
                    parentIdx = smallestIdx; // @step:sift-down
                }
            }
            // Insert current meeting's end time into the heap (allocate room)
            endTimeHeap[heapSize] = endTime; // @step:heap-insert
            heapSize++; // @step:heap-insert
            int currentIdx = heapSize - 1; // @step:heap-insert
            // Sift up to restore min-heap property
            while (currentIdx > 0) { // @step:sift-up
                int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
                if (endTimeHeap[currentIdx] >= endTimeHeap[parentIdx]) break; // @step:compare
                int swapTemp = endTimeHeap[currentIdx]; // @step:heap-swap
                endTimeHeap[currentIdx] = endTimeHeap[parentIdx]; // @step:heap-swap
                endTimeHeap[parentIdx] = swapTemp; // @step:heap-swap
                currentIdx = parentIdx; // @step:sift-up
            }
        }
        return heapSize; // @step:complete
    }
}
