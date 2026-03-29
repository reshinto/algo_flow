// Trapping Rain Water — O(n) two-pointer approach
public class TrappingRainWater {
    public static int[] trappingRainWater(int[] heights) {
        int arrayLength = heights.length;
        if (arrayLength == 0) { // @step:initialize
            return new int[]{0}; // @step:initialize
        }

        int leftPointer = 0; // @step:initialize
        int rightPointer = arrayLength - 1; // @step:initialize
        int maxLeft = 0; // @step:initialize
        int maxRight = 0; // @step:initialize
        int totalWater = 0; // @step:initialize
        int[] waterPerIndex = new int[arrayLength]; // @step:initialize

        while (leftPointer < rightPointer) {
            if (heights[leftPointer] <= heights[rightPointer]) { // @step:compare
                if (heights[leftPointer] >= maxLeft) { // @step:compare
                    maxLeft = heights[leftPointer]; // @step:visit
                } else {
                    waterPerIndex[leftPointer] = maxLeft - heights[leftPointer]; // @step:visit
                    totalWater += waterPerIndex[leftPointer]; // @step:visit
                }
                leftPointer++; // @step:visit
            } else {
                if (heights[rightPointer] >= maxRight) { // @step:compare
                    maxRight = heights[rightPointer]; // @step:visit
                } else {
                    waterPerIndex[rightPointer] = maxRight - heights[rightPointer]; // @step:visit
                    totalWater += waterPerIndex[rightPointer]; // @step:visit
                }
                rightPointer--; // @step:visit
            }
        }

        return new int[]{totalWater}; // @step:complete
    }
}
