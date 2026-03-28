// Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
import java.util.ArrayDeque;
import java.util.Deque;

public class SlidingWindowMaxDeque {
    public static int[] slidingWindowMaxDeque(int[] inputArray, int windowSize) {
        int arrayLength = inputArray.length;
        if (arrayLength == 0 || windowSize <= 0 || windowSize > arrayLength) { // @step:initialize
            return new int[]{}; // @step:initialize
        }

        int[] result = new int[arrayLength - windowSize + 1]; // @step:initialize
        Deque<Integer> indexDeque = new ArrayDeque<>(); // @step:initialize — front = max of current window
        int resultIndex = 0;

        for (int currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
            // Remove indices outside the current window from the front
            while (!indexDeque.isEmpty() && indexDeque.peekFirst() < currentIndex - windowSize + 1) { // @step:compare
                indexDeque.pollFirst(); // @step:visit
            }

            // Remove indices of elements smaller than the current element from the back
            while (!indexDeque.isEmpty() && inputArray[indexDeque.peekLast()] < inputArray[currentIndex]) { // @step:compare
                indexDeque.pollLast(); // @step:visit
            }

            indexDeque.offerLast(currentIndex); // @step:visit

            // The window is fully formed once currentIndex >= windowSize - 1
            if (currentIndex >= windowSize - 1) { // @step:compare
                result[resultIndex++] = inputArray[indexDeque.peekFirst()]; // @step:visit
            }
        }

        return result; // @step:complete
    }
}
