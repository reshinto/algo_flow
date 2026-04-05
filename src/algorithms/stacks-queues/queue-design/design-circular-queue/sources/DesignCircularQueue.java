// Design Circular Queue — fixed-capacity ring buffer with front/rear pointers (LeetCode 622)
import java.util.ArrayList;
import java.util.List;

public class DesignCircularQueue {
    public static List<String> designCircularQueue(String[] operations, int capacity) {
        Integer[] buffer = new Integer[capacity]; // @step:initialize
        int frontIndex = -1; // @step:initialize
        int rearIndex = -1; // @step:initialize
        int queueSize = 0; // @step:initialize
        List<String> results = new ArrayList<>(); // @step:initialize

        for (String operation : operations) { // @step:visit
            if (operation.startsWith("enqueue")) {
                String[] parts = operation.split(" "); // @step:enqueue
                int value = Integer.parseInt(parts[1]); // @step:enqueue

                if (queueSize == capacity) { // @step:enqueue
                    results.add("full"); // @step:enqueue
                } else {
                    if (frontIndex == -1) { // @step:enqueue
                        frontIndex = 0; // @step:enqueue
                    }
                    rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
                    buffer[rearIndex] = value; // @step:enqueue
                    queueSize++; // @step:enqueue
                    results.add("true"); // @step:enqueue
                }
            } else if (operation.equals("dequeue")) {
                if (queueSize == 0) { // @step:dequeue
                    results.add("empty"); // @step:dequeue
                } else {
                    int dequeuedValue = buffer[frontIndex]; // @step:dequeue
                    buffer[frontIndex] = null; // @step:dequeue
                    if (frontIndex == rearIndex) { // @step:dequeue
                        frontIndex = -1; // @step:dequeue
                        rearIndex = -1; // @step:dequeue
                    } else {
                        frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
                    }
                    queueSize--; // @step:dequeue
                    results.add(String.valueOf(dequeuedValue)); // @step:dequeue
                }
            } else if (operation.equals("front")) {
                if (frontIndex == -1) { // @step:peek
                    results.add("empty"); // @step:peek
                } else {
                    results.add(String.valueOf(buffer[frontIndex])); // @step:peek
                }
            } else if (operation.equals("rear")) {
                if (rearIndex == -1) { // @step:peek
                    results.add("empty"); // @step:peek
                } else {
                    results.add(String.valueOf(buffer[rearIndex])); // @step:peek
                }
            }
        }

        return results; // @step:complete
    }
}
