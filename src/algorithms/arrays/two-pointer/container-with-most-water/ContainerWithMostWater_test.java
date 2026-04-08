public class ContainerWithMostWater_test {
    public static void main(String[] args) {
        // Default input [1,8,6,2,5,4,8,3,7] -> maxArea=49
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{1, 8, 6, 2, 5, 4, 8, 3, 7});
            assert result[0] == 49 : "Expected maxArea=49, got " + result[0];
        }

        // Two equal bars [1,1] -> maxArea=1
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{1, 1});
            assert result[0] == 1 : "Expected maxArea=1, got " + result[0];
        }

        // All equal [5,5,5,5] -> maxArea=15
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{5, 5, 5, 5});
            assert result[0] == 15 : "Expected maxArea=15, got " + result[0];
        }

        // Single element -> maxArea=0
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{7});
            assert result[0] == 0 : "Expected maxArea=0 for single element, got " + result[0];
        }

        // Empty array -> maxArea=0
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{});
            assert result[0] == 0 : "Expected maxArea=0 for empty, got " + result[0];
        }

        // Monotonically increasing [1,2,3,4,5] -> maxArea=6
        {
            int[] result = ContainerWithMostWater.containerWithMostWater(new int[]{1, 2, 3, 4, 5});
            assert result[0] == 6 : "Expected maxArea=6, got " + result[0];
        }

        // Validate area at returned indices for default input
        {
            int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
            int[] result = ContainerWithMostWater.containerWithMostWater(heights);
            int leftIndex = result[1];
            int rightIndex = result[2];
            int computedArea = Math.min(heights[leftIndex], heights[rightIndex]) * (rightIndex - leftIndex);
            assert computedArea == result[0] : "Area at indices doesn't match maxArea";
        }

        System.out.println("All tests passed!");
    }
}
