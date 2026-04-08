public class LargestRectangleHistogram_test {
    public static void main(String[] args) {
        // Default input [2,1,5,6,2,3] -> maxArea=10 at span [2,3] height 5
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{2, 1, 5, 6, 2, 3});
            assert result[0] == 10 : "Expected maxArea=10, got " + result[0];
            assert result[1] == 2 : "Expected leftIndex=2, got " + result[1];
            assert result[2] == 3 : "Expected rightIndex=3, got " + result[2];
            assert result[3] == 5 : "Expected height=5, got " + result[3];
        }

        // Empty array
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{});
            assert result[0] == 0 : "Expected maxArea=0 for empty";
            assert result[1] == -1 : "Expected leftIndex=-1 for empty";
            assert result[2] == -1 : "Expected rightIndex=-1 for empty";
        }

        // Single bar [5]
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{5});
            assert result[0] == 5 : "Expected maxArea=5, got " + result[0];
            assert result[1] == 0 : "Expected leftIndex=0, got " + result[1];
            assert result[2] == 0 : "Expected rightIndex=0, got " + result[2];
        }

        // All equal bars [3,3,3,3] -> maxArea=12
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{3, 3, 3, 3});
            assert result[0] == 12 : "Expected maxArea=12, got " + result[0];
        }

        // Strictly increasing [1,2,3,4,5] -> maxArea=9
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{1, 2, 3, 4, 5});
            assert result[0] == 9 : "Expected maxArea=9, got " + result[0];
        }

        // Valley shape [5,0,5] -> maxArea=5
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{5, 0, 5});
            assert result[0] == 5 : "Expected maxArea=5, got " + result[0];
        }

        // Two tall bars [6,6] -> maxArea=12
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{6, 6});
            assert result[0] == 12 : "Expected maxArea=12, got " + result[0];
        }

        // Spike in middle [2,10,2] -> maxArea=10
        {
            int[] result = LargestRectangleHistogram.largestRectangleHistogram(new int[]{2, 10, 2});
            assert result[0] == 10 : "Expected maxArea=10, got " + result[0];
        }

        System.out.println("All tests passed!");
    }
}
