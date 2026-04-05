// Design Circular Deque — fixed-capacity ring buffer with front/rear insertion and removal (LeetCode 641)
import java.util.ArrayList;
import java.util.List;

public class DesignCircularDeque {
    public static List<String> designCircularDeque(String[] operations, int capacity) {
        Integer[] buffer = new Integer[capacity]; // @step:initialize
        int frontIndex = -1; // @step:initialize
        int rearIndex = -1; // @step:initialize
        int dequeSize = 0; // @step:initialize
        List<String> results = new ArrayList<>(); // @step:initialize

        for (String operation : operations) { // @step:visit
            if (operation.startsWith("pushBack")) {
                String[] parts = operation.split(" "); // @step:enqueue
                int value = Integer.parseInt(parts[1]); // @step:enqueue

                if (dequeSize == capacity) { // @step:enqueue
                    results.add("full"); // @step:enqueue
                } else {
                    if (frontIndex == -1) { // @step:enqueue
                        frontIndex = 0; // @step:enqueue
                    }
                    rearIndex = (rearIndex + 1) % capacity; // @step:enqueue
                    buffer[rearIndex] = value; // @step:enqueue
                    dequeSize++; // @step:enqueue
                    results.add("true"); // @step:enqueue
                }
            } else if (operation.startsWith("pushFront")) {
                String[] parts = operation.split(" "); // @step:enqueue-front
                int value = Integer.parseInt(parts[1]); // @step:enqueue-front

                if (dequeSize == capacity) { // @step:enqueue-front
                    results.add("full"); // @step:enqueue-front
                } else {
                    if (frontIndex == -1) { // @step:enqueue-front
                        frontIndex = 0; // @step:enqueue-front
                        rearIndex = 0; // @step:enqueue-front
                    } else {
                        frontIndex = (frontIndex - 1 + capacity) % capacity; // @step:enqueue-front
                    }
                    buffer[frontIndex] = value; // @step:enqueue-front
                    dequeSize++; // @step:enqueue-front
                    results.add("true"); // @step:enqueue-front
                }
            } else if (operation.equals("popFront")) {
                if (dequeSize == 0) { // @step:dequeue
                    results.add("empty"); // @step:dequeue
                } else {
                    int poppedValue = buffer[frontIndex]; // @step:dequeue
                    buffer[frontIndex] = null; // @step:dequeue
                    if (frontIndex == rearIndex) { // @step:dequeue
                        frontIndex = -1; // @step:dequeue
                        rearIndex = -1; // @step:dequeue
                    } else {
                        frontIndex = (frontIndex + 1) % capacity; // @step:dequeue
                    }
                    dequeSize--; // @step:dequeue
                    results.add(String.valueOf(poppedValue)); // @step:dequeue
                }
            } else if (operation.equals("popBack")) {
                if (dequeSize == 0) { // @step:dequeue-rear
                    results.add("empty"); // @step:dequeue-rear
                } else {
                    int poppedValue = buffer[rearIndex]; // @step:dequeue-rear
                    buffer[rearIndex] = null; // @step:dequeue-rear
                    if (frontIndex == rearIndex) { // @step:dequeue-rear
                        frontIndex = -1; // @step:dequeue-rear
                        rearIndex = -1; // @step:dequeue-rear
                    } else {
                        rearIndex = (rearIndex - 1 + capacity) % capacity; // @step:dequeue-rear
                    }
                    dequeSize--; // @step:dequeue-rear
                    results.add(String.valueOf(poppedValue)); // @step:dequeue-rear
                }
            } else if (operation.equals("peekFront")) {
                if (frontIndex == -1) { // @step:peek
                    results.add("empty"); // @step:peek
                } else {
                    results.add(String.valueOf(buffer[frontIndex])); // @step:peek
                }
            } else if (operation.equals("peekRear")) {
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
