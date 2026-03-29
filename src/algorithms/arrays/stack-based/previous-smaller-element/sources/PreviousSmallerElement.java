// Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class PreviousSmallerElement {
    public static int[] previousSmallerElement(int[] inputArray) {
        int arrayLength = inputArray.length;
        int[] resultArray = new int[arrayLength]; // @step:initialize
        Arrays.fill(resultArray, -1); // @step:initialize
        Deque<Integer> increasingStack = new ArrayDeque<>(); // @step:initialize

        for (int scanIndex = 0; scanIndex < arrayLength; scanIndex++) { // @step:visit
            int currentElement = inputArray[scanIndex]; // @step:visit

            // Pop elements from the stack that are >= currentElement
            while (!increasingStack.isEmpty() && inputArray[increasingStack.peek()] >= currentElement) { // @step:compare
                increasingStack.pop(); // @step:compare
            }

            // The new stack top (if any) is the nearest smaller element to the left
            if (!increasingStack.isEmpty()) { // @step:visit
                int nearestSmallerIndex = increasingStack.peek(); // @step:visit
                resultArray[scanIndex] = inputArray[nearestSmallerIndex]; // @step:visit
            }

            increasingStack.push(scanIndex); // @step:visit
        }

        return resultArray; // @step:complete
    }
}
