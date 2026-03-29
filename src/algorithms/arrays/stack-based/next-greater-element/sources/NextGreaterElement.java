// Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NextGreaterElement {
    public static int[] nextGreaterElement(int[] inputArray) {
        int arrayLength = inputArray.length;
        int[] resultArray = new int[arrayLength]; // @step:initialize
        Arrays.fill(resultArray, -1); // @step:initialize
        Deque<Integer> pendingStack = new ArrayDeque<>(); // @step:initialize

        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
            int currentElement = inputArray[scanIndex]; // @step:visit

            while (!pendingStack.isEmpty()) {
                int stackTop = pendingStack.peek(); // @step:compare
                if (inputArray[stackTop] < currentElement) { // @step:compare
                    int poppedIndex = pendingStack.pop(); // @step:compare
                    resultArray[poppedIndex] = currentElement; // @step:compare
                } else {
                    break;
                }
            }

            pendingStack.push(scanIndex); // @step:visit
        }

        return resultArray; // @step:complete
    }
}
