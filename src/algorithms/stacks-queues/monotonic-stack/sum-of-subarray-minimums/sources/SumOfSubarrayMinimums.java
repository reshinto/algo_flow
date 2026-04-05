// Sum of Subarray Minimums — for each element, compute its contribution as minimum across subarrays using monotonic stack
import java.util.ArrayDeque;
import java.util.Deque;

public class SumOfSubarrayMinimums {
    public static int sumOfSubarrayMinimums(int[] arr) {
        final int MOD = 1_000_000_007; // @step:initialize
        int arrayLength = arr.length; // @step:initialize
        int[] leftDistances = new int[arrayLength]; // @step:initialize
        int[] rightDistances = new int[arrayLength]; // @step:initialize
        Deque<Integer> indexStack = new ArrayDeque<>(); // @step:initialize

        // Compute left distances: distance to previous less element
        for (int elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
            int currentValue = arr[elementIdx]; // @step:visit
            // Pop while stack top has value >= current (not strictly less)
            while (!indexStack.isEmpty() && arr[indexStack.peek()] >= currentValue) { // @step:compare
                indexStack.pop(); // @step:maintain-monotonic
            }
            leftDistances[elementIdx] =
                indexStack.isEmpty() ? elementIdx + 1 : elementIdx - indexStack.peek(); // @step:resolve
            indexStack.push(elementIdx); // @step:push
        }

        indexStack.clear(); // @step:initialize

        // Compute right distances: distance to next less-or-equal element
        for (int elementIdx = arrayLength - 1; elementIdx >= 0; elementIdx--) {
            int currentValue = arr[elementIdx]; // @step:visit
            // Pop while stack top has value > current (strictly greater — allows equal on right)
            while (!indexStack.isEmpty() && arr[indexStack.peek()] > currentValue) { // @step:compare
                indexStack.pop(); // @step:maintain-monotonic
            }
            rightDistances[elementIdx] =
                indexStack.isEmpty() ? arrayLength - elementIdx : indexStack.peek() - elementIdx; // @step:resolve
            indexStack.push(elementIdx); // @step:push
        }

        // Sum contributions: each element contributes arr[i] * left[i] * right[i]
        long result = 0; // @step:initialize
        for (int elementIdx = 0; elementIdx < arrayLength; elementIdx++) {
            result = (result + (long) arr[elementIdx] * leftDistances[elementIdx] * rightDistances[elementIdx]) % MOD; // @step:resolve
        }

        return (int) result; // @step:complete
    }
}
