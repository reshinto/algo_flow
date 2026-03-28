// Largest Rectangle in Histogram — O(n) monotonic stack approach
import java.util.ArrayDeque;
import java.util.Deque;

public class LargestRectangleHistogram {
    public static int[] largestRectangleHistogram(int[] heights) {
        int arrayLength = heights.length;
        if (arrayLength == 0) { // @step:initialize
            return new int[]{0, -1, -1, 0}; // @step:initialize
        }

        Deque<Integer> indexStack = new ArrayDeque<>(); // @step:initialize
        int maxArea = 0; // @step:initialize
        int bestLeft = 0; // @step:initialize
        int bestRight = 0; // @step:initialize
        int bestHeight = 0; // @step:initialize

        for (int currentIndex = 0; currentIndex <= arrayLength; currentIndex++) {
            int currentHeight = currentIndex == arrayLength ? 0 : heights[currentIndex]; // @step:compare

            while (!indexStack.isEmpty() && currentHeight < heights[indexStack.peek()]) { // @step:compare
                int poppedIndex = indexStack.pop(); // @step:visit
                int poppedHeight = heights[poppedIndex]; // @step:visit
                int leftBoundary = indexStack.isEmpty() ? 0 : indexStack.peek() + 1; // @step:visit
                int width = currentIndex - leftBoundary; // @step:visit
                int area = poppedHeight * width; // @step:visit

                if (area > maxArea) { // @step:compare
                    maxArea = area; // @step:visit
                    bestLeft = leftBoundary; // @step:visit
                    bestRight = currentIndex - 1; // @step:visit
                    bestHeight = poppedHeight; // @step:visit
                }
            }

            indexStack.push(currentIndex); // @step:visit
        }

        return new int[]{maxArea, bestLeft, bestRight, bestHeight}; // @step:complete
    }
}
